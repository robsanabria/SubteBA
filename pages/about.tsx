import React from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>Acerca de - Alertas del Subte</title>
        <meta name="description" content="Información sobre la aplicación de alertas del Subte de Buenos Aires" />
      </Head>
      
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Acerca de Alertas del Subte</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">¿Qué es esta aplicación?</h2>
            <p className="mb-4">
              Alertas del Subte es una aplicación web que muestra información en tiempo real sobre el estado del Subte de Buenos Aires.
              La aplicación utiliza datos proporcionados por el Gobierno de la Ciudad de Buenos Aires para mostrar alertas y notificaciones
              sobre el servicio del Subte.
            </p>
            <p>
              Esta aplicación fue desarrollada como un proyecto de código abierto para proporcionar a los usuarios una forma fácil y rápida
              de conocer el estado actual del Subte de Buenos Aires.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
            <p className="mb-4">
              La aplicación consulta periódicamente la API del Gobierno de la Ciudad de Buenos Aires para obtener información actualizada
              sobre el estado del Subte. Si hay alguna alerta o notificación, se muestra en la página principal.
            </p>
            <p>
              Si no hay alertas, significa que el Subte está funcionando normalmente en todas sus líneas.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tecnologías utilizadas</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Next.js - Framework de React para aplicaciones web</li>
              <li>TypeScript - Superset tipado de JavaScript</li>
              <li>Tailwind CSS - Framework de CSS utilitario</li>
              <li>Poncho - Librería de estilos y componentes oficiales del Gobierno de Argentina</li>
            </ul>
          </section>
       
        </div>
      </main>
      
      <Footer />
    </>
  )
} 