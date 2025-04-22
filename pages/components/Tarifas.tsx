// components/Tarifas.tsx
export default function Tarifas() {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 rounded-lg shadow-md mt-12">
        <div className="flex items-center space-x-4">
          <div className="text-blue-600 text-4xl">
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-xl">Tarifas actualizadas del Subte</h5>
            <p className="text-sm text-gray-700 mt-2">
              Podés consultar las tarifas, pases y abonos vigentes haciendo click en el siguiente enlace:{' '}
              <a
                href="https://buenosaires.gob.ar/subte/tarifas-pases-y-abonos/tarifas"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                Ver tarifas actualizadas
              </a>.
            </p>
          </div>
        </div>
      </div>
    );
  }