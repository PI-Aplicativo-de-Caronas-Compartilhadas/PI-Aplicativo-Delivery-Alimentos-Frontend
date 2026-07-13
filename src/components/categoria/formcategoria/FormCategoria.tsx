import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria);
    } catch (error: any) {
      alert("erro ao buscar categoria por id");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categoria");
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categoria`, categoria, setCategoria);
        alert("A Categoria foi atualizada com sucesso!");
      } catch (error: any) {
        alert("erro ao atualizar a categoria");
      }
    } else {
      try {
        await cadastrar(`/categoria`, categoria, setCategoria);
        alert("A Categoria foi cadastrada com sucesso!");
      } catch (error: any) {
        alert("Erro ao cadastrar a categoria.");
      }
    }

    setIsLoading(false);
    retornar();
  }
  return (
    <>
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h1>{id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}</h1>

        <form onSubmit={gerarNovaCategoria}>
          <div>
            <label htmlFor="nome">Nome da Categoria</label>
            <input
              type="text"
              placeholder="Escreva sua categoria aqui"
              name="nome"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button type="submit">
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default FormCategoria;
