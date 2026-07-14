import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlera";
import { ClipLoader } from "react-spinners";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categoria por id", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categoria");
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categoria`, categoria, setCategoria);
        ToastAlerta("A Categoria foi atualizada com sucesso!", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar a categoria", "erro");
      }
    } else {
      try {
        await cadastrar(`/categoria`, categoria, setCategoria);
        ToastAlerta("A Categoria foi cadastrada com sucesso!", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar a categoria.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="w-full bg-white min-h-[calc(100vh-8rem)] text-[#042f17] py-12 px-8 flex flex-col items-center justify-center">
      <div className="container max-w-lg flex flex-col gap-6 bg-white p-8 rounded-2xl border border-[#bbf7d0] shadow-xl">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-[#042f17]">
            {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
          </h1>
          <p className="text-sm md:text-base text-[#075f2d] font-medium">
            Preencha os campos abaixo para gerenciar a categoria.
          </p>
        </div>

        <form
          onSubmit={gerarNovaCategoria}
          className="flex flex-col gap-5 mt-2"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="text-xs font-extrabold text-[#0b8e44] tracking-wider uppercase"
            >
              Nome da Categoria
            </label>
            <input
              type="text"
              placeholder="Escreva sua categoria aqui"
              name="nome"
              value={categoria.nome || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              className="w-full bg-[#f0fdf4] border border-[#bbf7d0] focus:border-[#0b8e44] focus:ring-1 focus:ring-[#0b8e44] text-[#042f17] placeholder-[#075f2d]/50 font-medium py-3 px-4 rounded-xl outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              type="button"
              onClick={retornar}
              disabled={isLoading}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#042f17] font-bold py-3 px-6 rounded-xl transition-colors shadow-sm text-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-sm flex items-center justify-center"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>
                  {isLoading
                    ? "Salvando..."
                    : id === undefined
                      ? "Cadastrar"
                      : "Atualizar"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;
