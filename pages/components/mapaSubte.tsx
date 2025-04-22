// components/MapaSubte.tsx

export default function MapaSubte() {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">Mapa de Estaciones</h2>
        <div className="border-t mb-6"></div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=15SBTyq8ZS8y2oi2s2LehbqaBZsLK1gg&ehbc=2E312F"
            width="100%"
            height="480"
            loading="lazy"
            className="w-full border border-gray-300 rounded-lg shadow-md"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    )
  }