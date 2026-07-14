import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Fire,
  ArrowRight,
  ArrowClockwise,
  Coffee,
  ForkKnife,
  BowlSteam,
  Hamburger,
} from "@phosphor-icons/react";
import ClimaNavbar from "../../components/navbar/ClimaNavbar";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlera";

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

  async function buscarDados() {
    try {
      await buscar("/produto", setProdutos);
      await buscar("/categoria", setCategorias); // Rota no singular conforme sua API
    } catch (error: any) {
      ToastAlerta("Erro ao carregar os dados.", "erro");
    }
  }

  useEffect(() => {
    buscarDados();
  }, []);

  // Mapeamento fixo de ícones para as categorias
  const iconesCategorias: Record<string, any> = {
    Café: Coffee,
    Almoço: ForkKnife,
    Jantar: BowlSteam,
    Lanches: Hamburger,
  };

  function obterImagemProduto(descricao?: string) {
    if (!descricao) return "/logo.png";
    if (descricao.includes("|")) {
      const partes = descricao.split("|");
      return partes[1]?.trim() || "/logo.png";
    }
    return "/logo.png";
  }

  const listaProdutos = Array.isArray(produtos) ? produtos : [];
  const listaCategorias = Array.isArray(categorias) ? categorias : [];

  // Filtra os produtos com base na categoria selecionada
  const produtosFiltrados = categoriaSelecionada !== null
    ? listaProdutos.filter((item) => item.categoria?.id === categoriaSelecionada)
    : listaProdutos;

  return (
    <div className="w-full bg-white text-spring-green-900 py-8 px-8 flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex flex-col gap-12">
        
        {/* Saudação Inicial + Clima Local */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl md:text-6xl font-black text-spring-green-900">
              Olá!
            </h1>
            <p className="text-2xl md:text-4xl text-spring-green-700 font-medium">
              Pronto para sua próxima refeição saudável?
            </p>
          </div>
          
          <div className="self-start sm:self-center">
            <ClimaNavbar />
          </div>
        </div>

        {/* Recomendação do Dia (Destaque Principal) */}
        <div className="bg-[#f0fdf4] text-[#042f17] p-6 md:p-8 rounded-2xl border border-[#bbf7d0] shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-1/3 h-48 rounded-xl overflow-hidden bg-white border border-[#bbf7d0]">
            <img
              src="/bowl-salada.jpeg"
              alt="Bowl de Quinoa com Abacate"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-[#0b8e44] tracking-wider uppercase bg-[#dcfce7] py-1 px-2.5 rounded-md w-fit">
              Recomendação do Dia
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#042f17]">
              Bowl de Quinoa com Abacate
            </h2>

            <div className="flex flex-wrap gap-3 text-xs font-bold text-[#075f2d] bg-[#dcfce7]/70 py-2 px-3.5 rounded-lg w-fit">
              <span className="flex items-center gap-1">
                <Fire size={15} weight="fill" className="text-[#f97316]" /> 450 kcal
              </span>
              <span>|</span>
              <span>35g Carb</span>
              <span>|</span>
              <span>20g Prot</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <NavLink
                to="/produto"
                className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-7 rounded-xl transition-all shadow-sm text-sm flex items-center gap-2"
              >
                Ver Detalhes <ArrowRight size={16} weight="bold" />
              </NavLink>
              <button className="text-[#0b8e44] hover:text-[#075f2d] font-bold text-xs flex items-center gap-1.5 transition-colors">
                <ArrowClockwise size={20} weight="bold" /> Trocar Sugestão
              </button>
            </div>
          </div>
        </div>

        {/* Explore por Categorias Dinâmicas */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-spring-green-900">
              Explore por Categorias
            </h3>
            {categoriaSelecionada !== null && (
              <button 
                onClick={() => setCategoriaSelecionada(null)}
                className="text-xs font-bold text-[#0b8e44] bg-[#dcfce7] border border-[#0b8e44] py-1.5 px-3.5 rounded-lg hover:bg-[#bbf7d0] transition-all shadow-sm"
              >
                Ver Todos
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {listaCategorias.map((cat) => {
              const Icon = iconesCategorias[cat.nome] || BowlSteam;
              const estaSelecionado = categoriaSelecionada === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setCategoriaSelecionada(cat.id)}
                  className={`group bg-white p-5 rounded-2xl border shadow-sm flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    estaSelecionado ? 'border-[#0b8e44] bg-[#dcfce7] scale-105' : 'border-[#bbf7d0] hover:border-[#4ade80]'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#dcfce7] flex items-center justify-center">
                    <Icon
                      size={30}
                      weight="fill"
                      className="text-[#15803d] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="font-bold text-lg text-[#14532d] text-center">
                    {cat.nome}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sugestões Rápidas / Produtos reais cadastrados */}
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold text-spring-green-900">
            {categoriaSelecionada !== null ? "Produtos Filtrados" : "Sugestões Rápidas"}
          </h3>
          
          {produtosFiltrados.length === 0 ? (
            <div className="text-center py-16 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-6">
              <p className="text-base text-spring-green-800 font-bold">Nenhum produto cadastrado neste momento.</p>
              <p className="text-xs text-spring-green-700 mt-1">Cadastre novos produtos para exibi-los aqui.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {produtosFiltrados.slice(0, 8).map((item) => {
                const imagemUrl = obterImagemProduto(item.descricao);

                return (
                  <NavLink
                    to="/produto"
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden border border-[#bbf7d0] shadow-sm 
                       hover:shadow-lg hover:-translate-y-1 
                       transition-all duration-300 ease-in-out 
                       transform hover:scale-105 
                       flex flex-col cursor-pointer group"
                  >
                    <div className="h-40 bg-[#f0fdf4] flex items-center justify-center overflow-hidden">
                      <img
                        src={imagemUrl}
                        alt={item.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/logo.png";
                        }}
                      />
                    </div>
                    <div className="p-3.5 flex flex-col items-center text-center">
                      <span className="font-bold text-2xl text-[#042f17] line-clamp-1">
                        {item.nome}
                      </span>
                      <span className="text-sm text-[#0b8e44] font-semibold mt-0.5">
                        {item.calorias} kcal
                      </span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;