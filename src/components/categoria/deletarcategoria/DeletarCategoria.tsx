import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlera";
import { ClipLoader } from "react-spinners";

function DeletarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categoria", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categoria/${id}`);
      ToastAlerta("Categoria deletada com sucesso", "sucesso");
    } catch (error: any) {
      ToastAlerta("Erro ao deletar a categoria.", "erro");
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categoria");
  }

  return (
    <div className="w-full bg-white min-h-[calc(100vh-8rem)] text-[#042f17] py-10 px-8 flex flex-col items-center">
      <div className="container max-w-xl flex flex-col gap-6 bg-white p-8 rounded-2xl border border-[#bbf7d0] shadow-xl">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-[#042f17]">
            Deletar Categoria
          </h1>
          <p className="text-sm md:text-base text-[#075f2d] font-medium">
            Você tem certeza de que deseja apagar a Categoria a seguir?
          </p>
        </div>

        <div className="bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] p-6 flex flex-col gap-3 shadow-sm">
          <header className="text-xs font-extrabold text-[#0b8e44] tracking-wider uppercase">
            Categoria
          </header>
          <p className="text-2xl font-black text-[#042f17]">{categoria.nome}</p>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={retornar}
            disabled={isLoading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#042f17] font-bold py-3 px-6 rounded-xl transition-colors shadow-sm text-sm"
          >
            Não
          </button>

          <button
            onClick={deletarCategoria}
            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
