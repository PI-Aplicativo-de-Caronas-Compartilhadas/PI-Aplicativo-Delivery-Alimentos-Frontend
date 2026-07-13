import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#bbf7d0] shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start w-full">
          <header className="text-xs font-extrabold text-[#0b8e44] tracking-wider uppercase">
            {produto.categoria?.nome || "Sem Categoria"}
          </header>
          <span className="text-xs font-bold bg-[#bbf7d0] text-[#042f17] px-2 py-0.5 rounded-full">
            {produto.calorias} kcal
          </span>
        </div>
        
        <p className="text-xl font-black text-[#042f17]">{produto.nome}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{produto.descricao}</p>
        
        <p className="text-2xl font-black text-[#0b8e44] mt-1">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Link to={`/editarproduto/${produto.id}`} className="flex-1">
          <button className="w-full bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Editar
          </button>
        </Link>

        <Link to={`/deletarproduto/${produto.id}`} className="flex-1">
          <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Deletar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;