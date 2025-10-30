import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { SelecaoForm } from "../components/SelecaoForm";
import { useSelecaoStore } from "../store/selecaoStore";

export const Home = () => {
  const { selecoes, adicionarSelecao, deletarSelecao, fetchSelecoes, loading } =
    useSelecaoStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSelecoes();
  }, [fetchSelecoes]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-100 via-white to bg-yellow-100">
      <header className="bg-linear-to-r from-red-600 to-yellow-600 text-white py-4 sm:py-8 px-2 sm:px-4 shadow-lg">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center">
          Gerenciamento de Seleções - Copa 2022
        </h1>
        <div className="flex justify-between items-center mt-4">
          <span>Olá, {user?.name}</span>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-7xl">
        <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Adicionar Nova Seleção
          </h2>
          <SelecaoForm onSubmit={adicionarSelecao} />
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Seleções Cadastradas ({selecoes.length})
          </h2>
          {loading && <p className="text-center">Carregando seleções...</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selecoes.map((selecao) => (
              <Card
                key={selecao.id}
                title={selecao.nome}
                footer={
                  <>
                    <Button
                      variant="danger"
                      onClick={() => deletarSelecao(selecao.id)}
                    >
                      Deletar
                    </Button>
                  </>
                }
              >
                <p>Grupo: {selecao.grupo}</p>
                <p>Títulos: {selecao.titulos}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
