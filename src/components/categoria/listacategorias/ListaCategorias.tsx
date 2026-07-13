import { useNavigate } from "react-router-dom";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useEffect, useState } from "react";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { CircleNotch, PlusCircle } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../utils/ToastAlera";

function ListaCategorias() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria[]>([]);

  useEffect(() => {
    buscarCategorias();
  }, [categoria.length]);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await buscar("/categoria", setCategoria);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar categorias", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white min-h-[calc(100vh-8rem)] text-[#042f17] py-10 px-8 flex flex-col items-center">
      <div className="container max-w-6xl flex flex-col gap-8">
        
        {/* Cabeçalho Principal da Página */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#bbf7d0] pb-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-[#042f17]">
              Lista de Categorias
            </h1>
            <p className="text-sm md:text-base text-[#075f2d] font-medium">
              Gerencie todas as categorias cadastradas na plataforma.
            </p>
          </div>
          <button
            onClick={() => navigate("/cadastrarcategoria")}
            className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md text-sm flex items-center gap-2"
          >
            <PlusCircle size={20} weight="bold" /> Nova Categoria
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <CircleNotch
              size={48}
              weight="bold"
              className="text-[#0b8e44] animate-spin"
            />
          </div>
        )}

        {!isLoading && categoria.length === 0 && (
          <div className="text-center py-20 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-8">
            <p className="text-xl font-bold text-[#075f2d]">
              Nenhuma categoria encontrada.
            </p>
            <p className="text-sm text-[#075f2d]/70 mt-1">
              Cadastre uma nova categoria para começar.
            </p>
          </div>
        )}

        {/* Lista Vertical com Cabeçalho "Nome da categoria" e "Ações" */}
        {!isLoading && categoria.length > 0 && (
          <div className="flex flex-col gap-3 w-full bg-white rounded-2xl border border-[#d3ecd8] p-6 shadow-sm">
            
            {/* Barra de Títulos do Menu/Tabela */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-[#d3ecd8] text-[11px] font-extrabold text-[#0b8e44] tracking-widest uppercase">
              <span>Nome da categoria</span>
              <span>Ações</span>
            </div>

            {/* Itens Empilhados */}
            <div className="flex flex-col gap-2 mt-1">
              {categoria.map((cat) => (
                <CardCategoria key={cat.id} categoria={cat} />
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ListaCategorias;