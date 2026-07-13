import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <>
      <div>
        <header>Tema</header>
        <p>{categoria.nome}</p>

        <div>
          <Link to="">
            <button>Editar</button>
          </Link>

          <Link to="">
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardCategoria;
