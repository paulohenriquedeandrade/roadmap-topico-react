import { create } from "zustand";
import { selecaoService } from "../services/selecaoService";
import type { Selecao } from "../types";

interface SelecaoState {
  selecoes: Selecao[];
  loading: boolean;
  fetchSelecoes: () => Promise<void>;
  adicionarSelecao: (dados: Omit<Selecao, "id">) => Promise<void>;
  deletarSelecao: (id: number) => Promise<void>;
}

export const useSelecaoStore = create<SelecaoState>((set) => ({
  selecoes: [],
  loading: false,

  fetchSelecoes: async () => {
    set({ loading: true });
    try {
      const data = await selecaoService.getAll();
      set({ selecoes: data });
    } catch (error) {
      console.error("Erro ao buscar seleções:", error);
    } finally {
      set({ loading: false });
    }
  },

  adicionarSelecao: async (dados) => {
    try {
      const selecao = await selecaoService.create(dados);
      set((state) => ({
        selecoes: [...state.selecoes, selecao],
      }));
    } catch (error) {
      console.error("Erro ao adicionar seleção:", error);
      throw error;
    }
  },

  deletarSelecao: async (id) => {
    try {
      await selecaoService.delete(id);
      set((state) => ({
        selecoes: state.selecoes.filter((selecao) => selecao.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar seleção:", error);
      throw error;
    }
  },
}));
