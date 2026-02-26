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
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-[#101E37]">Estado de la Red</h2>
        {lastUpdated && !loading && (
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Actualizado {formatTimeAgo(lastUpdated)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SUBTE_LINES.map(line => {
          const status = getStatusForLine(line.id)
          const isNormal = status === 'Normal'

          return (
            <div key={line.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="p-5 flex items-center gap-4">
                <div className={`w-14 h-14 ${line.color} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-sm transition-transform group-hover:scale-110`}>
                  {line.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">Línea {line.id}</h3>
                  <div className="mt-1 flex items-center">
                    <span className={`text-sm font-medium ${isNormal ? 'text-green-600' : 'text-red-600'}`}>
                      {loading ? (
                        <span className="opacity-50 italic">Cargando...</span>
                      ) : (
                        status
                      )}
                    </span>
                  </div>
                </div>
                {!isNormal && (
                  <div className="bg-red-50 p-2 rounded-full">
                    <span className="text-red-500 text-lg">⚠️</span>
                  </div>
                )}
              </div>
              <div className={`h-1.5 w-full ${isNormal ? 'bg-green-500' : 'bg-red-500'} opacity-80`}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}