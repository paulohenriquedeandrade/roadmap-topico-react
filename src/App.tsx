import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { SelecaoForm } from "./components/SelecaoForm";
import { useSelecaoStore } from "./store/selecaoStore";

function App() {
  const { selecoes, adicionarSelecao, deletarSelecao } = useSelecaoStore();

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">
        Gerenciamento de Seleções - Copa 2022
      </h1>
      <SelecaoForm onSubmit={adicionarSelecao} />
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
  );
}

export default App;
