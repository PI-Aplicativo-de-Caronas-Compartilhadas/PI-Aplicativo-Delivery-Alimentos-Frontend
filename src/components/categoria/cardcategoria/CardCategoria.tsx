import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#d3ecd8] shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-extrabold text-[#0b8e44] tracking-widest uppercase">
          Categoria
        </span>
        <p className="text-lg md:text-xl font-black text-[#042f17]">{categoria.nome}</p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <Link to={`/editarcategoria/${categoria.id}`} className="flex-1 md:w-28">
          <button className="w-full bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Editar
          </button>
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`} className="flex-1 md:w-28">
          <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Deletar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;