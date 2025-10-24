import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import type { Selecao } from "./types";
import { SelecaoForm } from "./components/SelecaoForm";

function App() {
  const [selecoes, setSelecoes] = useState<Selecao[]>(() => {
    const dadosSalvos = localStorage.getItem("selecoes");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

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

  useEffect(() => {
    localStorage.setItem("selecoes", JSON.stringify(selecoes));
  }, [selecoes]);

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
