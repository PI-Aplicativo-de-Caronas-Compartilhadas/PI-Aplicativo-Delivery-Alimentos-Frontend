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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    number | null
  >(null);

  const [recomendacoes, setRecomendacoes] = useState<Produto[]>([]);
  const [isLoadingRecomendacao, setIsLoadingRecomendacao] =
    useState<boolean>(false);

  async function buscarDados() {
    try {
      await buscar("/produto", setProdutos);
      await buscar("/categoria", setCategorias);
    } catch (error: any) {
      ToastAlerta("Erro ao carregar os dados.", "erro");
    }
  }

  async function obterRecomendacoes() {
    try {
      setIsLoadingRecomendacao(true);
      await buscar("produto/recomendacoes", (dados: Produto[]) => {
        if (Array.isArray(dados)) {
          setRecomendacoes(dados);
        } else {
          setRecomendacoes([]);
        }
      });
    } catch (error: any) {
      console.error("Erro ao obter recomendações:", error);
      setRecomendacoes([]);
    } finally {
      setIsLoadingRecomendacao(false);
    }
  }

  useEffect(() => {
    buscarDados();
    obterRecomendacoes();
  }, []);

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

  const produtosFiltrados =
    categoriaSelecionada !== null
      ? listaProdutos.filter(
          (item) => item.categoria?.id === categoriaSelecionada,
        )
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

        {/* Recomendações do Dia (Destaque Principal Dinâmico com os produtos do Back) */}
        <div className="bg-[#f0fdf4] text-[#042f17] p-6 md:p-8 rounded-2xl border border-[#bbf7d0] shadow-md flex flex-col gap-6 min-h-[240px]">
          <div className="flex items-center justify-between border-b border-[#bbf7d0] pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-extrabold text-[#0b8e44] tracking-wider uppercase bg-[#dcfce7] py-1 px-2.5 rounded-md w-fit">
                Especiais do Dia
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#042f17]">
                Nossas Recomendações Saudáveis
              </h2>
            </div>
            <button
              onClick={obterRecomendacoes}
              disabled={isLoadingRecomendacao}
              className="text-[#0b8e44] hover:text-[#075f2d] font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <ArrowClockwise
                size={18}
                className={isLoadingRecomendacao ? "animate-spin" : ""}
                weight="bold"
              />
              Trocar Sugestões
            </button>
          </div>

          {isLoadingRecomendacao ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8 gap-3 w-full">
              <ArrowClockwise
                size={32}
                className="animate-spin text-[#0b8e44]"
              />
              <p className="text-sm font-semibold text-[#075f2d]">
                Selecionando as melhores opções...
              </p>
            </div>
          ) : recomendacoes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {recomendacoes.map((rec) => (
                <NavLink
                  to="/produto"
                  key={rec.id}
                  className="group flex flex-col sm:flex-row gap-4 items-center bg-white p-5 rounded-xl border border-[#dcfce7] 
                    hover:border-[#bbf7d0] hover:shadow-lg hover:-translate-y-1 
                    transition-all duration-300 ease-in-out transform cursor-pointer"
                >
                  <div className="w-full sm:w-1/3 h-32 rounded-lg overflow-hidden bg-[#f0fdf4] border border-[#e2e8f0]">
                    <img
                      src={rec.foto || obterImagemProduto(rec.descricao)}
                      alt={rec.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5 w-full text-left">
                    {/* Aumentado o tamanho da letra do título do produto recomendado */}
                    <h3 className="text-xl md:text-2xl font-black text-[#042f17] line-clamp-1">
                      {rec.nome}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#075f2d] bg-[#dcfce7]/50 py-1 px-2.5 rounded w-fit">
                      <span className="flex items-center gap-0.5">
                        <Fire
                          size={13}
                          weight="fill"
                          className="text-[#f97316]"
                        />{" "}
                        {rec.calorias || 0} kcal
                      </span>
                      <span>|</span>
                      <span>R$ {(rec.preco || 0).toFixed(2)}</span>
                    </div>

                    {/* Descrição levemente maior e mais legível */}
                    <p className="text-sm text-[#075f2d]/80 line-clamp-2 leading-relaxed">
                      {rec.descricao
                        ? rec.descricao.split("|")[0].trim()
                        : "Sem descrição disponível."}
                    </p>

                    {/* Texto mais intuitivo para guiar o usuário ao cardápio geral */}
                    <span className="text-[#0b8e44] group-hover:text-[#075f2d] font-bold text-xs flex items-center gap-1 mt-1 transition-all">
                      Ver Cardápio Completo{" "}
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-6 gap-3 w-full text-center">
              <p className="text-sm font-bold text-[#075f2d]">
                Nenhuma recomendação cadastrada no momento.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  obterRecomendacoes();
                }}
                className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center gap-1.5 transition-all"
              >
                <ArrowClockwise size={14} /> Carregar Sugestões
              </button>
            </div>
          )}
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
                    estaSelecionado
                      ? "border-[#0b8e44] bg-[#dcfce7] scale-105"
                      : "border-[#bbf7d0] hover:border-[#4ade80]"
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
            {categoriaSelecionada !== null
              ? "Produtos Filtrados"
              : "Sugestões Rápidas"}
          </h3>

          {produtosFiltrados.length === 0 ? (
            <div className="text-center py-16 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-6">
              <p className="text-base text-spring-green-800 font-bold">
                Nenhum produto cadastrado neste momento.
              </p>
              <p className="text-xs text-spring-green-700 mt-1">
                Cadastre novos produtos para exibi-los aqui.
              </p>
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
