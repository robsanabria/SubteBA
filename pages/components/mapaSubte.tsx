// components/MapaSubte.tsx

export default function MapaSubte() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-[#101E37] mb-8">Mapa de la Red</h2>
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