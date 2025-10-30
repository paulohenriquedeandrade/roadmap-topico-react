import { api } from "./api";
import type { Selecao } from "../types";

export const selecaoService = {
  getAll: async () => {
    const response = await api.get<Selecao[]>("/v3/selecoes");
    return response.data;
  },

  create: async (data: Omit<Selecao, "id">) => {
    const response = await api.post<Selecao>("/v3/selecoes", data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/v3/selecoes/${id}`);
  },
};
