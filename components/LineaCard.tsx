import React from 'react'

interface LineaCardProps {
  nombre: string
  color: string
  estado: 'normal' | 'demora' | 'interrumpido'
  descripcion?: string
}

const LineaCard: React.FC<LineaCardProps> = ({ nombre, color, estado, descripcion }) => {
  const estadoToClase = {
    normal: 'bg-arg-verde text-white',
    demora: 'bg-arg-amarillo text-dark',
    interrumpido: 'bg-arg-rojo text-white',
  }
  
  const estadoToTexto = {
    normal: 'Normal',
    demora: 'Demoras',
    interrumpido: 'Interrumpido',
  }
  
  const estadoToIcono = {
    normal: '✅',
    demora: '⚠️',
    interrumpido: '🚫',
  }
  
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{nombre}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoToClase[estado]}`}>
            {estadoToIcono[estado]} {estadoToTexto[estado]}
          </span>
        </div>
        {descripcion && <p className="text-arg-gris-oscuro">{descripcion}</p>}
      </div>
    </div>
  )
}

export default LineaCard 