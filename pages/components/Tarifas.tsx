// components/Tarifas.tsx
export default function Tarifas() {
  return (
    <div className="bg-white border-l-4 border-[#336ACC] p-8 rounded-xl shadow-sm mt-16 flex flex-col md:flex-row items-center gap-6">
      <div className="bg-[#336ACC]/10 p-4 rounded-full">
        <div className="text-[#336ACC] text-4xl">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-bold text-2xl text-[#101E37]">Tarifas y Pases</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">
          Consultá las tarifas vigentes, abonos especiales y pases gratuitos para jubilados, estudiantes y personas con discapacidad.
        </p>
        <div className="mt-4">
          <a
            href="https://buenosaires.gob.ar/subte/tarifas-pases-y-abonos/tarifas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#336ACC] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#2855a3] transition-colors shadow-sm"
          >
            Ver tarifas actualizadas
          </a>
        </div>
      </div>
    </div>
  );
}