import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Breadcrumb() {
  const router = useRouter()
  const pathSegments = router.pathname.split('/').filter(Boolean)
  
  const breadcrumbItems = [
    { href: '/', label: 'Inicio' },
    ...pathSegments.map((segment, index) => ({
      href: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: segment.charAt(0).toUpperCase() + segment.slice(1)
    }))
  ]

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="breadcrumb">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          
          return (
            <li 
              key={item.href}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              {...(isLast ? { 'aria-current': 'page' } : {})}
            >
              {isLast ? (
                item.label
              ) : (
                <Link href={item.href} className="text-decoration-none">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 