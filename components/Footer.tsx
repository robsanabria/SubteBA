import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-arg-gris-claro py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-arg-gris-oscuro text-sm">
              Datos proporcionados por el Gobierno de la Ciudad de Buenos Aires
            </p>
            <p className="text-arg-gris-oscuro text-sm mt-1">
              Última actualización: {new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/" className="text-arg-azul hover:underline text-sm">
              Inicio
            </Link>
            <Link href="/about" className="text-arg-azul hover:underline text-sm">
              Acerca de
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-arg-gris text-center">
          <p className="text-arg-gris-oscuro text-xs">
            © {new Date().getFullYear()} Alertas del Subte. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 