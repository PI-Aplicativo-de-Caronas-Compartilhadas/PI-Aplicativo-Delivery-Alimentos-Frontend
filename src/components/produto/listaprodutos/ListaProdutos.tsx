import { useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";

function ListaProdutos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await buscar("/produto", setProdutos);
    } catch (error: any) {
      alert("Erro ao buscar os produtos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <div className="flex justify-center w-full my-4">
      <div className="container flex flex-col px-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-lg font-bold text-[#0b8e44] animate-pulse">Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-bold text-[#042f17]">Nenhum produto cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaProdutos;