import { useEffect, useState } from 'react'
import Alerta from '@/components/Alerta'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LineCard from '@/components/LineCard'
import { Alert, LineAlert } from '@/types/alerts'

export default function Home() {
  const [alerts, setAlerts] = useState<LineAlert[]>([])
  const [history, setHistory] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [globalInterruption, setGlobalInterruption] = useState(false)

  useEffect(() => {
    fetch('/api/alerts')
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.current || [])
        setHistory(data.history || [])
        
        // Verificar si hay una interrupción global
        const interrupted = data.current?.some((alert: LineAlert) => 
          alert.alert?.status === 'interrumpido'
        ) || false;
        setGlobalInterruption(interrupted);
        
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function getAlertType(header: string, description: string): 'success' | 'warning' | 'danger' | 'info' {
    const lowerHeader = header.toLowerCase()
    const lowerDesc = description.toLowerCase()
    
    if (lowerHeader.includes('interrump') || lowerDesc.includes('interrump') ||
        lowerHeader.includes('cerrad') || lowerDesc.includes('cerrad') ||
        lowerHeader.includes('medida de fuerza') || lowerDesc.includes('medida de fuerza') ||
        lowerHeader.includes('paro') || lowerDesc.includes('paro') ||
        lowerHeader.includes('huelga') || lowerDesc.includes('huelga')) {
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
        <link rel="icon" type="image/png" href="/train.png" />
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
            {globalInterruption && (
              <div className="alert alert-danger mb-8" role="alert">
                <h4 className="alert-heading">⚠️ Servicio interrumpido en la red de subterráneos</h4>
                <p>Hay interrupciones que afectan al servicio. Por favor, consulta el estado de cada línea para más detalles.</p>
              </div>
            )}
          
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
                      name={alert.alert.header_text.translation[0].text}
                      status={alert.alert.status || 'normal'}
                      description={alert.alert.description_text.translation[0].text}
                      color={alert.id === 'linea-a' ? '#2E96D3' :
                             alert.id === 'linea-b' ? '#D52B1E' :
                             alert.id === 'linea-c' ? '#0E4FA3' :
                             alert.id === 'linea-d' ? '#197E5E' :
                             alert.id === 'linea-e' ? '#8B1E9B' :
                             alert.id === 'linea-h' ? '#E0C72B' :
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