import type Categoria from "./Categoria";

export default interface Produto {
  id: number;
  nome: string;
  preco: number;
  calorias: number;
  descricao: string;
  categoria: Categoria | null;
}
