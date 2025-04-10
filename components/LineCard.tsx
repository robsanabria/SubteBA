import React from 'react'

interface LineCardProps {
  name: string
  status: string
  description: string
  color: string
}

export default function LineCard({ name, status, description, color }: LineCardProps) {
  // Normalizar el estado para garantizar que se muestre correctamente
  const normalizedStatus = status.toLowerCase();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-success text-white'
      case 'demora':
        return 'bg-warning text-dark'
      case 'interrumpido':
        return 'bg-danger text-white'
      default:
        return 'bg-secondary text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Servicio normal'
      case 'demora':
        return 'Demoras'
      case 'interrumpido':
        return 'Servicio interrumpido'
      default:
        return 'Estado desconocido'
    }
  }

  // Verificar si el servicio es normal o hay información específica
  const isNormalService = normalizedStatus === 'normal' && description === 'Servicio normal';
  
  // Verificar si hay una interrupción
  const isInterrupted = normalizedStatus === 'interrumpido';

  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{name}</h5>
          <span className={`badge ${getStatusColor(normalizedStatus)}`}>
            {getStatusText(normalizedStatus)}
          </span>
        </div>
        {!isNormalService && (
          <p className="card-text text-muted mb-0">
            {description}
          </p>
        )}
      </div>
    </div>
  )
} 