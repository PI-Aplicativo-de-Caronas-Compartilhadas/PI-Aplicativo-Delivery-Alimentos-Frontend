import { useNavigate, NavLink } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState<string>(" ");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (busca.trim() !== "") {
      // Redireciona para a página de produtos passando o termo de busca como query parameter
      navigate(`/produtos?search=${encodeURIComponent(busca)}`);
    }
  }

  return (
    <div className="w-full h-16 bg-white text-[#042f17] px-8 flex justify-between items-center border-b border-[#d0fbe3] shadow-sm relative overflow-visible z-50">
      
      {/* LADO ESQUERDO: Logo com altura h-34 e translate-y */}
      <div className="flex items-center min-w-[150px]">
        <NavLink to="/home" className="flex items-center relative z-10">
          <img 
            src="/logo.png" 
            alt="Logo Nutrigo" 
            className="h-34 w-auto object-contain translate-y-2.5" 
          />
        </NavLink>
      </div>

      {/* CENTRO: Barra de Busca integrada e elegante */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Buscar pratos, bebidas..."
            value={busca}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
            className="w-full bg-slate-50 border border-[#bbf7d0] focus:border-[#0b8e44] text-[#042f17] text-sm rounded-full py-2 pl-4 pr-10 outline-none transition-all placeholder:text-gray-400"
          />
          <button 
            type="submit" 
            className="absolute right-3 text-[#0b8e44] hover:text-[#075f2d] transition-colors"
          >
            {/* Ícone de Lupa SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </button>
        </div>
      </form>

      {/* LADO DIREITO: Links de Navegação */}
      <div className="flex gap-6 items-center min-w-[200px] justify-end">
        <NavLink to="/home" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
          Início
        </NavLink>
        <NavLink to="/categorias" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
          Categorias
        </NavLink>
        <NavLink to="/produtos" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
          Produtos
        </NavLink>
      </div>

    </div>
  );
}

export default Navbar;