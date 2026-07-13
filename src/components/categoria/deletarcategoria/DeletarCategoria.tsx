import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";

function DeletarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria);
    } catch (error: any) {
      alert("erro ao buscar categoria");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categoria/${id}`);

      alert("Categoria deletada com sucesso");
    } catch (error: any) {
      alert("Erro ao deletar a categoria.");
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categoria");
  }
  return (
    <>
      <div className="container w-1/3 mx-auto">
        <h1>Deletar Categoria</h1>
        <p>Você tem certeza de que deseja apagar a Categoria a seguir?</p>
        <div>
          <header>Categoria</header>
          <p className="p-8 text-3xl h-full">{categoria.nome}</p>
          <div className="flex">
            <button onClick={retornar}>Não</button>
            <button onClick={deletarCategoria}>Sim</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletarCategoria;
