import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-background">
      <h1 className="text-6xl font-bold text-base-title b-4">404</h1>
      <p className="text-2xl text-base-text mb-8">Página Não Encontrada</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-blue rounded hover:bg-blue-500"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
