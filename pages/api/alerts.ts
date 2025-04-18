// api/alerts.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { Alert, LineAlert, LineState, SubwayLine } from '@/types/alerts'

// Almacenamiento en memoria para el historial
const alertHistory: Alert[] = []

// Datos de ejemplo para el historial
const sampleHistory = [
  {
    id: 'hist-1',
    header: 'Demoras en Línea B',
    description: 'Demoras de 15 minutos en la Línea B entre las estaciones Juan Manuel de Rosas y Malabia.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
  },
  {
    id: 'hist-2',
    header: 'Servicio normal en Línea A',
    description: 'El servicio en la Línea A ha vuelto a la normalidad después de las demoras registradas.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
  },
  {
    id: 'hist-3',
    header: 'Interrupción en Línea E',
    description: 'Servicio interrumpido en la Línea E entre las estaciones Bolívar y Juramento por problemas técnicos.',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
  }
]

// Lista de todas las líneas del subte
const allLines: SubwayLine[] = [
  { id: 'linea-a', name: 'Línea A', color: '#2E96D3' },
  { id: 'linea-b', name: 'Línea B', color: '#D52B1E' },
  { id: 'linea-c', name: 'Línea C', color: '#0E4FA3' },
  { id: 'linea-d', name: 'Línea D', color: '#197E5E' },
  { id: 'linea-e', name: 'Línea E', color: '#8B1E9B' },
  { id: 'linea-h', name: 'Línea H', color: '#E0C72B' },
  { id: 'premetro', name: 'Premetro', color: '#F5A623' }
]

function determineStatus(header: string, description: string): string {
  const lowerHeader = header.toLowerCase()
  const lowerDesc = description.toLowerCase()
  
  // Palabras clave que indican interrupción
  const interruptionKeywords = [
    'interrump',
    'cerrad',
    'sin servicio',
    'no opera',
    'limitado',
    'suspendido',
    'fuera de servicio',
    'no funciona',
    'medida de fuerza',
    'huelga',
    'paro',
    'gremial'
  ]

  // Palabras clave que indican demora
  const delayKeywords = [
    'demora',
    'retraso',
    'circulación reducida',
    'servicio limitado',
    'frecuencia irregular'
  ]

  // Verificar interrupciones
  if (interruptionKeywords.some(keyword => 
      lowerHeader.includes(keyword) || lowerDesc.includes(keyword))) {
    return 'interrumpido'
  }

  // Verificar demoras
  if (delayKeywords.some(keyword => 
      lowerHeader.includes(keyword) || lowerDesc.includes(keyword))) {
    return 'demora'
  }

  // Si hay estaciones mencionadas, probablemente hay algún problema
  if ((lowerHeader.includes('estacion') || lowerDesc.includes('estacion')) &&
      (lowerHeader.includes('entre') || lowerDesc.includes('entre'))) {
    return 'interrumpido'
  }

  return 'normal'
}

// Verifica si una alerta indica una interrupción global del servicio
function isGlobalInterruption(header: string, description: string): boolean {
  const lowerHeader = header.toLowerCase()
  const lowerDesc = description.toLowerCase()
  
  const globalKeywords = [
    'todas las líneas',
    'todas las lineas',
    'todo el sistema',
    'servicio interrumpido',
    'medida de fuerza',
    'paro general',
    'huelga general',
    'red de subterráneos'
  ]
  
  return globalKeywords.some(keyword => 
    lowerHeader.includes(keyword) || lowerDesc.includes(keyword)
  )
}

function getLineFromAlert(alert: LineAlert): string | null {
  // Intentar obtener el ID de la línea del route_id
  const routeId = alert.alert?.informed_entity?.[0]?.route_id || ''
  if (routeId.toLowerCase().includes('linea')) {
    return routeId
  }
  
  // Buscar en el header y description
  const header = alert.alert?.header_text?.translation?.[0]?.text || ''
  const description = alert.alert?.description_text?.translation?.[0]?.text || ''
  const textToSearch = `${header} ${description}`.toLowerCase()
  
  for (const line of allLines) {
    // Buscar tanto por nombre completo como por letra de línea
    const lineNameLower = line.name.toLowerCase()
    const lineLetter = lineNameLower.replace('línea ', '')
    
    if (textToSearch.includes(lineNameLower) || 
        textToSearch.includes(`linea ${lineLetter}`) ||
        textToSearch.includes(`línea ${lineLetter}`)) {
      return line.name
    }
  }
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ current: LineAlert[], history: Alert[] }>
) {
  const url = 'https://apitransporte.buenosaires.gob.ar/subtes/serviceAlerts'
  const params = new URLSearchParams({
    client_id: '0d54d155ed334326a3106da69cfa3772',
    client_secret: 'e2E4De90f57941AD9F488Fd854E8110A',
    json: '1',
  })

  try {
    const response = await fetch(`${url}?${params}`)
    const data = await response.json()
    const newAlerts: LineAlert[] = data?.entity?.filter((e: LineAlert) => e.alert) || []

    const now = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })

    // Buscar si hay alguna interrupción global
    let globalInterruption = false
    let globalInterruptionDescription = ''
    
    for (const alert of newAlerts) {
      const header = alert.alert?.header_text?.translation?.[0]?.text || ''
      const description = alert.alert?.description_text?.translation?.[0]?.text || ''
      
      if (isGlobalInterruption(header, description)) {
        globalInterruption = true
        globalInterruptionDescription = description || header
        break
      }
    }

    // Procesar alertas actuales
    const lineStates = new Map<string, LineState>()
    
    // Si hay interrupción global, marcar todas las líneas como interrumpidas
    if (globalInterruption) {
      for (const line of allLines) {
        lineStates.set(line.id, {
          status: 'interrumpido',
          description: globalInterruptionDescription,
          alerts: ['Servicio interrumpido']
        })
      }
    }
    
    // Si no hay interrupción global, procesar alertas individuales
    if (!globalInterruption) {
      // Primero procesamos las alertas para encontrar interrupciones y demoras
      newAlerts.forEach(alert => {
        const header = alert.alert?.header_text?.translation?.[0]?.text || ''
        const description = alert.alert?.description_text?.translation?.[0]?.text || ''
        const status = determineStatus(header, description)
        const lineName = getLineFromAlert(alert)
        
        if (lineName) {
          const line = allLines.find(l => l.name.toLowerCase() === lineName.toLowerCase())
          if (line) {
            const currentState = lineStates.get(line.id) || { status: 'normal', description: '', alerts: [] }
            
            // Si hay una interrupción o demora, actualizamos el estado
            if (status !== 'normal') {
              currentState.status = status
              currentState.alerts.push(header)
              if (description && !currentState.description.includes(description)) {
                currentState.description = currentState.description 
                  ? `${currentState.description}. ${description}`
                  : description
              }
            }
            lineStates.set(line.id, currentState)
          }
        }
      })
    }

    // Agregar al historial todas las alertas
    newAlerts.forEach(alert => {
      const header = alert.alert?.header_text?.translation?.[0]?.text || ''
      const description = alert.alert?.description_text?.translation?.[0]?.text || ''
      const alertId = alert.id?.toString() || `${header}-${description}`.replace(/[^a-z0-9]/gi, '-')
      
      if (!alertHistory.find((a) => a.id === alertId)) {
        alertHistory.push({ 
          id: alertId, 
          header, 
          description, 
          timestamp: now 
        })
      }
    })

    // Limpiar alertas más viejas que 2 horas
    const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000)
    const updatedHistory = alertHistory.filter(
      (a) => new Date(a.timestamp) >= cutoff
    )
    alertHistory.length = 0
    alertHistory.push(...updatedHistory)

    // Crear la lista final de líneas con sus estados
    const linesWithAlerts = allLines.map(line => {
      const state = lineStates.get(line.id)
      const alerts = state?.alerts || []
      const description = state?.description || 'Servicio normal'
      const status = state?.status || 'normal'
      
      return {
        id: line.id,
        alert: {
          header_text: {
            translation: [{ text: line.name }]
          },
          description_text: {
            translation: [{ text: description }]
          },
          status
        }
      }
    })

    res.status(200).json({ 
      current: linesWithAlerts, 
      history: updatedHistory 
    })
  } catch (error) {
    console.error('Error fetching service alerts:', error)
    res.status(200).json({ 
      current: allLines.map(line => ({
        id: line.id,
        alert: {
          header_text: {
            translation: [{ text: line.name }]
          },
          description_text: {
            translation: [{ text: 'Servicio normal' }]
          },
          status: 'normal'
        }
      })), 
      history: [] 
    })
  }
}