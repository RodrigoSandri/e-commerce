export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Página Não Encontrada
      </h1>
      <p className="text-gray-700 mb-6">
        O conteúdo que você procura não existe ou foi removido.
      </p>
      <a
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Voltar para a Home
      </a>
    </div>
  );
}
