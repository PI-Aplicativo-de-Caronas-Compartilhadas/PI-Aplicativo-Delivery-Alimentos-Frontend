import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#bbf7d0] shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <header className="text-xs font-extrabold text-[#0b8e44] tracking-wider uppercase">
          Categoria
        </header>
        <p className="text-xl font-black text-[#042f17]">{categoria.nome}</p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Link to={`/editarcategoria/${categoria.id}`} className="flex-1">
          <button className="w-full bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Editar
          </button>
        </Link>

        <Link to={`/deletarcategoria/${categoria.id}`} className="flex-1">
          <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Deletar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;