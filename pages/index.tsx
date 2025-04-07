import { useEffect, useState } from 'react'
import Alerta from '@/components/Alerta'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LineCard from '@/components/LineCard'

interface Alert {
  id: string
  header: string
  description: string
  timestamp: string
}

export default function Home() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [history, setHistory] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alerts')
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.current?.map(mapAlert) || [])
        setHistory(data.history?.map(mapAlert) || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function mapAlert(alert: any): Alert {
    const id = alert.id
    const header = alert.alert?.header_text?.translation?.[0]?.text || alert.header || 'Sin título'
    const description = alert.alert?.description_text?.translation?.[0]?.text || alert.description || 'Sin descripción'
    const timestamp = alert.timestamp || new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    })
    return { id, header, description, timestamp }
  }

  function getAlertType(header: string, description: string): 'success' | 'warning' | 'danger' | 'info' {
    const lowerHeader = header.toLowerCase()
    const lowerDesc = description.toLowerCase()
    
    if (lowerHeader.includes('interrump') || lowerDesc.includes('interrump') ||
        lowerHeader.includes('cerrad') || lowerDesc.includes('cerrad')) {
      return 'danger'
    } else if (lowerHeader.includes('demora') || lowerDesc.includes('demora')) {
      return 'warning'
    } else if (lowerHeader.includes('normal') || lowerDesc.includes('normal')) {
      return 'success'
    }
    return 'info'
  }

  return (
    <>
      <Head>
        <title>Alertas del Subte - Buenos Aires</title>
        <meta name="description" content="Estado actual del Subte de Buenos Aires" />
        <link rel="icon" href="/transporte-publico-dut.svg" />
      </Head>
      
      <Navbar />
      
      <main className="container py-8">
        <Breadcrumb />
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🚇 Alertas del Subte</h1>
          <p className="text-arg-gris-oscuro">Información en tiempo real sobre el estado del Subte de Buenos Aires</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-arg-azul"></div>
          </div>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Historial reciente</h2>
              
              {history.length === 0 ? (
                <p className="text-arg-gris-oscuro italic">No hay historial disponible.</p>
              ) : (
                <div className="space-y-4">
                  {history.map((alert) => (
                    <Alerta
                      key={alert.id}
                      titulo={alert.header}
                      descripcion={`${alert.description} (${alert.timestamp})`}
                      tipo={getAlertType(alert.header, alert.description)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Estado actual</h2>
              
              {alerts.length === 0 ? (
                <Alerta
                  titulo="Servicio normal"
                  descripcion="El Subte está funcionando normalmente en todas sus líneas."
                  tipo="success"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {alerts.map((alert) => (
                    <LineCard
                      key={alert.id}
                      name={alert.header}
                      status={getAlertType(alert.header, alert.description) === 'danger' ? 'interrumpido' : 
                             getAlertType(alert.header, alert.description) === 'warning' ? 'demora' : 'normal'}
                      description={alert.description}
                      color={alert.header.includes('Línea A') ? '#2E96D3' :
                             alert.header.includes('Línea B') ? '#D52B1E' :
                             alert.header.includes('Línea C') ? '#0E4FA3' :
                             alert.header.includes('Línea D') ? '#197E5E' :
                             alert.header.includes('Línea E') ? '#8B1E9B' :
                             alert.header.includes('Línea H') ? '#E0C72B' :
                             '#F5A623'}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </>
  )
}