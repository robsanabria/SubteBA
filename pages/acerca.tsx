import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export default function Acerca() {
  return (
    <>
      <Head>
        <title>Acerca de - Alertas del Subte</title>
        <meta name="description" content="Información sobre la aplicación de alertas del Subte de Buenos Aires" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="container py-8">
        <Breadcrumb />
        
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Acerca de</h1>
            <p className="text-arg-gris-oscuro">Información sobre la aplicación de alertas del Subte</p>
          </header>

          <section className="prose prose-lg mx-auto">
            <h2>¿Qué es esta aplicación?</h2>
            <p>
              Esta aplicación es una herramienta que muestra el estado actual del Subte de Buenos Aires,
              proporcionando información en tiempo real sobre el servicio, demoras y posibles interrupciones.
            </p>

            <h2>¿De dónde viene la información?</h2>
            <p>
              La información se obtiene directamente de la API oficial del Gobierno de la Ciudad de Buenos Aires,
              lo que garantiza que los datos sean precisos y actualizados.
            </p>

            <h2>Características principales</h2>
            <ul>
              <li>Estado en tiempo real de todas las líneas del Subte</li>
              <li>Alertas sobre demoras e interrupciones</li>
              <li>Historial de alertas recientes</li>
              <li>Interfaz intuitiva y fácil de usar</li>
              <li>Diseño responsivo para todos los dispositivos</li>
            </ul>

            <h2>Tecnologías utilizadas</h2>
            <ul>
              <li>Next.js para el framework de la aplicación</li>
              <li>TypeScript para el tipado estático</li>
              <li>Tailwind CSS para los estilos</li>
              <li>Poncho (ar-poncho) para el diseño según las guías del Gobierno de Argentina</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 