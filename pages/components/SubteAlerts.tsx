import { useEffect, useState } from 'react'

interface Alert {
  id: string
  line: string
  description: string
}

interface ApiEntity {
  id?: string
  alert?: {
    informed_entity?: { route_id?: string }[]
    description_text?: {
      translation?: { text: string }[]
    }
  }
}

const SUBTE_LINES = [
  { id: 'A', color: 'bg-blue-500' },
  { id: 'B', color: 'bg-red-500' },
  { id: 'C', color: 'bg-blue-800' },
  { id: 'D', color: 'bg-green-600' },
  { id: 'E', color: 'bg-purple-700' },
  { id: 'H', color: 'bg-yellow-500' },
  { id: 'P', color: 'bg-yellow-400' },
]

function formatTimeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000)

  if (diff < 60) return `hace ${diff} segundo${diff !== 1 ? 's' : ''}`
  if (diff < 3600) {
    const mins = Math.floor(diff / 60)
    return `hace ${mins} minuto${mins !== 1 ? 's' : ''}`
  }
  const hours = Math.floor(diff / 3600)
  return `hace ${hours} hora${hours !== 1 ? 's' : ''}`
}

export default function SubteAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        const formatted = (data.entity || []).map((item: ApiEntity, i: number) => ({
          id: item.id || `alert-${i}`,
          line: item.alert?.informed_entity?.[0]?.route_id || '',
          description: item.alert?.description_text?.translation?.[0]?.text || '',
        }))
        setAlerts(formatted)
        setLastUpdated(Date.now())
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getStatusForLine = (lineId: string): string => {
    const alert = alerts.find(a => a.line === `Linea${lineId}`)
    return alert ? alert.description : 'Normal'
  }

  return (
    <div className="p-6" >
      <h1 className="text-2xl font-bold text-center mb-4">Estado de subtes hoy </h1>
      <div className="border-t mb-6"></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 justify-items-center">
        {SUBTE_LINES.map(line => (
          <div key={line.id} className="text-center">
            <div className={`w-12 h-12 ${line.color} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto`}>
              {line.id}
            </div>
            <p className="mt-2 text-sm">
              {loading ? 'Cargando...' : getStatusForLine(line.id)}
            </p>
          </div>
        ))}
      </div>

     
    </div>
  )
}