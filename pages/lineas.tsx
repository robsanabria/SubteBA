import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LineCard from '@/components/LineCard'

interface Line {
  id: string
  name: string
  status: string
  description: string
  color: string
}

const lineColors = {
  'Línea A': '#2E96D3',
  'Línea B': '#D52B1E',
  'Línea C': '#0E4FA3',
  'Línea D': '#197E5E',
  'Línea E': '#8B1E9B',
  'Línea H': '#E0C72B',
  'Premetro': '#F5A623'
}

export default function Lineas() {
  const [lines, setLines] = useState<Line[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alerts')
      .then((res) => res.json())
      .then((data) => {
        const lineData = data.current.map((alert: any) => {
          const name = alert.alert?.header_text?.translation?.[0]?.text || ''
          const description = alert.alert?.description_text?.translation?.[0]?.text || 'Servicio normal'
          const status = alert.alert?.status || 'normal'
          const color = lineColors[name as keyof typeof lineColors] || '#0066CC'
          return { 
            id: alert.id, 
            name, 
            status, 
            description, 
            color 
          }
        })
        setLines(lineData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Líneas del Subte - Buenos Aires</title>
        <meta name="description" content="Estado de las líneas del Subte de Buenos Aires" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="container py-8">
        <Breadcrumb />
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🚇 Líneas del Subte</h1>
          <p className="text-arg-gris-oscuro">Estado actual de cada línea del Subte de Buenos Aires</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-arg-azul"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lines.map((line) => (
              <LineCard
                key={line.id}
                name={line.name}
                status={line.status}
                description={line.description}
                color={line.color}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </>
  )
} 