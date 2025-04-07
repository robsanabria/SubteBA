import { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LineCard from '@/components/LineCard'
import { LineAlert } from '@/types/alerts'

export default function Lineas() {
  const [alerts, setAlerts] = useState<LineAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alerts')
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.current || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Estado de las Líneas - Alertas del Subte</title>
        <meta name="description" content="Estado actual de todas las líneas del Subte de Buenos Aires" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container py-8">
        <Breadcrumb />
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Estado de las Líneas</h1>
          <p className="text-arg-gris-oscuro">Estado actual de todas las líneas del Subte de Buenos Aires</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-arg-azul"></div>
          </div>
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
      </main>

      <Footer />
    </>
  )
} 