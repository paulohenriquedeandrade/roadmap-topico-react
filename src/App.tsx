import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import type { Selecao } from "./types";
import { SelecaoForm } from "./components/SelecaoForm";

function App() {
  const [selecoes, setSelecoes] = useState<Selecao[]>([
    {
      id: 1,
      nome: "Brasil",
      grupo: "G",
      titulos: 5,
    },
    {
      id: 2,
      nome: "Argentina",
      grupo: "C",
      titulos: 2,
    },
    {
      id: 3,
      nome: "França",
      grupo: "D",
      titulos: 2,
    },
    {
      id: 4,
      nome: "Alemanha",
      grupo: "E",
      titulos: 4,
    },
  ]);

  const adicionarSelecao = (dados: {
    nome: string;
    grupo: string;
    titulos: number;
  }) => {
    const novaSelecao: Selecao = {
      id: selecoes.length + 1,
      nome: dados.nome,
      grupo: dados.grupo,
      titulos: dados.titulos,
    };
    setSelecoes([...selecoes, novaSelecao]);
  };

  const deletarSelecao = (id: number) => {
    setSelecoes(selecoes.filter((selecao) => selecao.id !== id));
  };

  return (
    <div>
      <h1>Gerenciamento de Seleções - Copa 2022</h1>
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
