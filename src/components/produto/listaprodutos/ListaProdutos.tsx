import { useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlera";
import { SyncLoader } from "react-spinners";

function ListaProdutos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await buscar("/produto", setProdutos);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar os produtos.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#0b8e44" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col px-4">
          {!isLoading && produtos.length === 0 && (
            <div className="text-center py-20 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-8">
              <p className="text-xl font-bold text-[#075f2d]">
                Nenhum Produto Encontrado.
              </p>
              <p className="text-sm text-[#075f2d]/70 mt-1">
                Cadastre um novo produto para começar.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
