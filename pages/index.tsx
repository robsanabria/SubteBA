import Head from 'next/head'
import SubteAlerts from './components/SubteAlerts';
import MapaSubte from './components/mapaSubte';
import Tarifas from './components/Tarifas'
import '../styles/index.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    const update = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    })
    setLastUpdate(update)
  }, [])

  return (
    <>
      <Head>
      <link rel="icon" type="image/png" href="/train.png" />
        <title>Estado del Subte - BA</title>
        <meta name="description" content="Alertas y estado del subte en tiempo real" />
      </Head>

      {/* Header */}
      <header style={{ backgroundColor: '#5A7290' }} className="text-white py-6 text-center" id="inicio">
       <h1 className="text-3xl font-bold">🚇 Estado del Subte</h1>
       <p className="text-sm mt-1">Información oficial y en tiempo real de la red de subterráneos</p>
      </header>

      {/* Alertas */}
      <main className="container mx-auto px-4 py-10">
        <SubteAlerts />
        <MapaSubte />
        <Tarifas />

        
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-12 border-t">
        <p>Datos proporcionados por el Gobierno de la Ciudad de Buenos Aires</p>
        <p className="mt-1">Última actualización: {lastUpdate}</p>
        <nav className="mt-2">
          <a href="#inicio" className="mx-2 hover:underline">Ir al inicio</a>
        </nav>
        <p className="mt-2">© 2025 Alertas del Subte. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}