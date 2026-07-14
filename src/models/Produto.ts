import type Categoria from "./Categoria";

export default interface Produto {
  id: number;
  nome: string;
  preco: number;
  calorias: number;
  descricao: string;
  foto?: string; // Novo campo para a URL da imagem
  categoria: Categoria | null;
}