const TarefasContent = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <p className="text-gray-600 mb-4">Gerencie suas tarefas e responsabilidades</p>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <input type="checkbox" className="rounded" />
          <span>Preparar apresentação para reunião</span>
        </div>
        <div className="flex items-center space-x-3">
          <input type="checkbox" className="rounded" />
          <span>Enviar convites para evento</span>
        </div>
        <div className="flex items-center space-x-3">
          <input type="checkbox" className="rounded" defaultChecked />
          <span className="line-through text-gray-500">Revisar documentos</span>
        </div>
      </div>
    </div>
  </div>
)

export default TarefasContent