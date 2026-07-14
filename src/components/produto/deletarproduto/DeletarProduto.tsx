import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlera";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    calorias: 0,
    descricao: "",
    categoria: null,
  });

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produto/${id}`, setProduto);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar o produto", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);
    try {
      await deletar(`/produto/${id}`);
      ToastAlerta("Produto removido com sucesso!", "sucesso");
      retornar();
    } catch (error: any) {
      ToastAlerta("Erro ao tentar remover o produto.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/produto");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-[80vh] px-4">
      <div className="w-full max-w-md flex flex-col bg-white rounded-xl shadow-sm border border-[#bbf7d0] overflow-hidden p-6 gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <header className="text-xs font-extrabold text-[#ef4444] tracking-wider uppercase">
            Remover Produto
          </header>
          <p className="text-lg font-bold text-[#042f17]">
            Tem certeza de que deseja apagar este produto?
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-xl font-black text-[#042f17]">{produto.nome}</p>
          <p className="text-sm text-gray-500 mt-1">
            {produto.categoria?.nome}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={retornar}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors text-sm"
          >
            Não
          </button>
          <button
            onClick={deletarProduto}
            disabled={isLoading}
            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] disabled:bg-rose-300 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm flex justify-center items-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Sim"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;
