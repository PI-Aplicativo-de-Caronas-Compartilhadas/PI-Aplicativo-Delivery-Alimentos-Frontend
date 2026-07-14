import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlera";
import { PlusCircle, CircleNotch } from "@phosphor-icons/react";

function ListaProdutos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // 1. Captura os parâmetros da URL (enviados pela sua Navbar)
  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get("search") || "";

  // 2. Função de busca dinâmica
  async function buscarProdutos() {
    try {
      setIsLoading(true);

      if (termoBusca.trim() !== "") {
        // Se houver pesquisa na URL, consome seu endpoint: /produto/nome/{nome}
        await buscar(`/produto/nome/${termoBusca}`, (dados: Produto[]) => {
          if (Array.isArray(dados)) {
            setProdutos(dados);
          } else {
            setProdutos([]);
          }
        });
      } else {
        // Caso a busca esteja vazia, traz a listagem padrão completa de produtos
        await buscar("/produto", setProdutos);
      }
    } catch (error: any) {
      ToastAlerta("Erro ao buscar os produtos.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  // 3. Monitora o termo de busca. Se mudar, roda a função novamente.
  useEffect(() => {
    buscarProdutos();
  }, [termoBusca]);

  return (
    <div className="w-full bg-white min-h-[calc(100vh-8rem)] text-[#042f17] py-10 px-8 flex flex-col items-center">
      <div className="container max-w-6xl flex flex-col gap-8 w-full">
        {/* Cabeçalho Dinâmico da Lista de Produtos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#bbf7d0] pb-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-[#042f17]">
              {termoBusca ? "Resultado da Busca" : "Lista de Produtos"}
            </h1>
            <p className="text-sm md:text-base text-[#075f2d] font-medium">
              {termoBusca ? (
                <span>
                  Exibindo resultados para:{" "}
                  <strong className="text-[#0b8e44]">"{termoBusca}"</strong>
                </span>
              ) : (
                "Gerencie todos os produtos cadastrados na plataforma."
              )}
            </p>
          </div>
          <button
            onClick={() => navigate("/cadastrarproduto")}
            className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md text-sm flex items-center gap-2"
          >
            <PlusCircle size={20} weight="bold" /> Novo Produto
          </button>
        </div>

        {/* Feedback Visual: Loading, Vazio ou Lista */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <CircleNotch
              size={48}
              weight="bold"
              className="text-[#0b8e44] animate-spin"
            />
          </div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-20 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-8">
            <p className="text-xl font-bold text-[#075f2d]">
              {termoBusca
                ? "Nenhum produto corresponde à sua pesquisa."
                : "Nenhum produto cadastrado ainda."}
            </p>
            <p className="text-sm text-[#075f2d]/70 mt-1">
              {termoBusca
                ? "Tente verificar a ortografia ou mude o termo pesquisado."
                : "Cadastre um novo produto para começar."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
