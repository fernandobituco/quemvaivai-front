const DashboardContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Próximos Eventos</h3>
      <p className="text-gray-600">Você tem 3 eventos programados para esta semana.</p>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Grupos Ativos</h3>
      <p className="text-gray-600">Você participa de 7 grupos diferentes.</p>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Tarefas Pendentes</h3>
      <p className="text-gray-600">5 tarefas aguardando sua atenção.</p>
    </div>
  </div>
)

export default DashboardContent