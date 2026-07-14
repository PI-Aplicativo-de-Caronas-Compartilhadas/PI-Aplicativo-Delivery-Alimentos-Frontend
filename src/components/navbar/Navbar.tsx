import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlera";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para monitorar onde o usuário está no site
  const [busca, setBusca] = useState<string>("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (busca.trim() !== "") {
      navigate(`/produto?search=${encodeURIComponent(busca)}`);
    }
  }

  // Função para limpar a busca
  function limparBusca() {
    setBusca(""); // Limpa o estado local do input
    navigate("/produto"); // Redireciona para a lista completa sem o "?search=..."
  }

  // Se o usuário sair da página de produtos, limpa a barra de busca automaticamente
  useEffect(() => {
    if (!location.pathname.startsWith("/produto")) {
      setBusca("");
    }
  }, [location.pathname]);

  function logout() {
    ToastAlerta("O usuário foi desconectado com sucesso", "sucesso");
    navigate("/");
  }

  return (
    <div className="w-full h-16 bg-white text-[#042f17] px-8 flex justify-between items-center border-b border-[#d0fbe3] shadow-sm relative overflow-visible z-50">
      {/* LADO ESQUERDO: Logo */}
      <div className="flex items-center min-w-[150px]">
        <NavLink to="/home" className="flex items-center relative z-10">
          <img
            src="/logo.png"
            alt="Logo Nutrigo"
            className="h-34 w-auto object-contain translate-y-2.5"
          />
        </NavLink>
      </div>

      {/* CENTRO: Barra de Busca com botão de Limpar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Buscar pratos, bebidas..."
            value={busca}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBusca(e.target.value)
            }
            // Dá um espaço extra à direita (pr-12) para que o texto não fique embaixo dos botões
            className="w-full bg-slate-50 border border-[#bbf7d0] focus:border-[#0b8e44] text-[#042f17] text-sm rounded-full py-2 pl-4 pr-12 outline-none transition-all placeholder:text-gray-400"
          />

          <div className="absolute right-3 flex items-center gap-2">
            {/* Botão X para limpar - Só aparece se houver algo escrito no campo */}
            {busca && (
              <button
                type="button"
                onClick={limparBusca}
                className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                title="Limpar busca"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Linha divisória sutil se o botão de fechar estiver visível */}
            {busca && <div className="h-4 w-[1px] bg-gray-300"></div>}

            {/* Botão de Pesquisar (Lupa) */}
            <button
              type="submit"
              className="text-[#0b8e44] hover:text-[#075f2d] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* LADO DIREITO: Links de Navegação + Clima Local */}
      <div className="flex gap-6 items-center min-w-[280px] justify-end">
        <NavLink
          to="/home"
          className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base"
        >
          Início
        </NavLink>
        <NavLink
          to="/categoria"
          className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base"
        >
          Categorias
        </NavLink>
        <NavLink
          to="/produto"
          className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base"
        >
          Produtos
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
