import { create } from "zustand";
import type { Selecao } from "../types";

interface SelecaoState {
  selecoes: Selecao[];
  adicionarSelecao: (dados: {
    nome: string;
    grupo: string;
    titulos: number;
  }) => void;
  deletarSelecao: (id: number) => void;
}

export const useSelecaoStore = create<SelecaoState>((set) => ({
  selecoes: [],
  adicionarSelecao: (dados) => {
    set((state) => ({
      selecoes: [
        ...state.selecoes,
        {
          id: state.selecoes.length + 1,
          ...dados,
        },
      ],
    }));
  },
  deletarSelecao: (id) => {
    set((state) => ({
      selecoes: state.selecoes.filter((selecao) => selecao.id !== id),
    }));
  },
}));
