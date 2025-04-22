// pages/api/alerts.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'https://apitransporte.buenosaires.gob.ar/subtes/serviceAlerts'
  const params = new URLSearchParams({
    client_id: '0d54d155ed334326a3106da69cfa3772',
    client_secret: 'e2E4De90f57941AD9F488Fd854E8110A',
    json: '1',
  })

  try {
    const response = await fetch(`${url}?${params}`)
    if (!response.ok) throw new Error('Error al obtener datos')
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener información' })
  }
}