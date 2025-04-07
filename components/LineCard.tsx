import React from 'react'

interface LineCardProps {
  name: string
  status: string
  description: string
  color: string
}

export default function LineCard({ name, status, description, color }: LineCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
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

  const isNormalService = status === 'normal' && description === 'Servicio normal'

  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{name}</h5>
          <span className={`badge ${getStatusColor(status)}`}>
            {getStatusText(status)}
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