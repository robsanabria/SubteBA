import Head from 'next/head'
import SubteAlerts from './components/SubteAlerts';
import MapaSubte from './components/mapaSubte';
import Tarifas from './components/Tarifas'
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
      <header className="bg-[#101E37] text-white py-8 text-center" id="inicio">
        <h1 className="text-4xl font-bold tracking-tight">🚇 Estado del Subte</h1>
        <p className="text-lg mt-2 opacity-90">Información oficial y en tiempo real de la red de subterráneos</p>
      </header>

      {/* Franja Amarilla GCBA */}
      <div className="h-2 bg-[#FFD600]"></div>

      {/* Alertas */}
      <main className="container mx-auto px-4 py-12">
        <SubteAlerts />
        <MapaSubte />
        <Tarifas />
      </main>

      {/* Footer */}
      <footer className="bg-[#101E37] text-white py-10 mt-16 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">Datos proporcionados por el Gobierno de la Ciudad de Buenos Aires</p>
          <p className="mt-2 text-sm opacity-60">Última actualización: {lastUpdate}</p>
          <nav className="mt-4">
            <a href="#inicio" className="mx-2 hover:text-[#FFD600] transition-colors">Ir al inicio</a>
          </nav>
          <div className="mt-6 border-t border-gray-800 pt-6">
            <p className="text-xs opacity-50">© 2025 Alertas del Subte. Roberto Sanabria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}