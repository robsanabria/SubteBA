import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/lineas', label: 'Líneas' },
    { href: '/acerca', label: 'Acerca de' },
  ]

  const isActive = (path: string) =>
    router.pathname === path
      ? 'bg-arg-celeste text-white font-bold'
      : 'hover:bg-arg-celeste hover:text-white'

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-white text-lg font-bold">
            <span>🚇</span>
            <span>Subte BA</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm transition ${isActive(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden space-y-2 pb-4 transition-all">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md text-sm ${isActive(link.href)}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar