// components/Alerta.tsx
import React from 'react'

interface AlertaProps {
  titulo: string
  descripcion: string
  tipo: 'success' | 'warning' | 'danger' | 'info'
}

export default function Alerta({ titulo, descripcion, tipo }: AlertaProps) {
  return (
    <div className={`alert alert-${tipo} mb-4`}>
      <h5 className="alert-heading">{titulo}</h5>
      <p className="mb-0">{descripcion}</p>
    </div>
  )
}