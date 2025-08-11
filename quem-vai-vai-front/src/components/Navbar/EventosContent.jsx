const EventosContent = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <p className="text-gray-600 mb-4">Organize e participe de eventos</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Reunião de Planejamento</h4>
            <p className="text-sm text-gray-600">Hoje às 15:00</p>
          </div>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmado</span>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Workshop de React</h4>
            <p className="text-sm text-gray-600">Amanhã às 10:00</p>
          </div>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pendente</span>
        </div>
      </div>
    </div>
  </div>
)

export default EventosContent