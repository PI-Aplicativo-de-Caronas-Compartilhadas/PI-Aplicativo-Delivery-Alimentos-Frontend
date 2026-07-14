import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  // Separa o texto da descrição da URL da imagem guardada com "|"
  const partes = produto.descricao?.split("|") || [];
  const descricaoTexto = partes[0]?.trim() || produto.descricao;
  const imagemUrl = partes[1]?.trim() || "/logo.png"; // Alterado para o logo da empresa

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#d3ecd8] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      
      {/* Exibição dinâmica da Foto ou Logo padrão */}
      <div className="h-40 bg-[#f0fdf4] overflow-hidden">
        <img 
          src={imagemUrl} 
          alt={produto.nome} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.png"; // Fallback para o logo se o link falhar
          }}
        />
      </div>

      <div className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start w-full">
          <header className="text-xs font-extrabold text-[#0b8e44] tracking-wider uppercase">
            {produto.categoria?.nome || "Sem Categoria"}
          </header>
          <span className="text-xs font-bold bg-[#bbf7d0] text-[#042f17] px-2 py-0.5 rounded-full">
            {produto.calorias} kcal
          </span>
        </div>
        
        <p className="text-xl font-black text-[#042f17]">{produto.nome}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{descricaoTexto}</p>
        
        <p className="text-2xl font-black text-[#0b8e44] mt-1">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
      </div>

      <div className="flex items-center gap-3 p-6 pt-0">
        <Link to={`/editarproduto/${produto.id}`} className="flex-1">
          <button className="w-full bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Editar
          </button>
        </Link>

        <Link to={`/deletarproduto/${produto.id}`} className="flex-1">
          <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Deletar
          </button>
        </Link>
      </div>
      
    </div>
  );
}

export default CardProduto;