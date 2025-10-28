import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface SelecaoFormProps {
  onSubmit: (selecao: { nome: string; grupo: string; titulos: number }) => void;
}

export const SelecaoForm = ({ onSubmit }: SelecaoFormProps) => {
  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState("");
  const [titulos, setTitulos] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !grupo) return;

    onSubmit({ nome, grupo, titulos });
    setNome("");
    setGrupo("");
    setTitulos(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          label="Seleção"
          value={nome}
          onChange={setNome}
          placeholder="Nome da Seleção"
        />

        <Input
          label="Grupo"
          value={grupo}
          onChange={setGrupo}
          placeholder="Grupo da Seleção"
        />

        <Input
          label="Titulos"
          value={String(titulos)}
          onChange={(value) => setTitulos(Number(value))}
          placeholder="Número de Títulos"
        />
      </div>

      <Button type="submit">Adicionar</Button>
    </form>
  );
};
