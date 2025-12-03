import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-green-600 text-white p-4 flex gap-6 justify-center font-semibold">
        <Link to="/">Home</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/cadastro">Cadastrar Produto</Link>
      </nav>

      <main className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
  