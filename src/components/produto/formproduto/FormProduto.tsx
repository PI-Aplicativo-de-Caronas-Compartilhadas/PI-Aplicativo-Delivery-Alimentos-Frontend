import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar, cadastrar, atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlera";
import { ClipLoader, SyncLoader } from "react-spinners";

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>({
    id: 0,
    nome: "",
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preco: 0,
    calorias: 0,
    descricao: "",
    foto: "",
    categoria: null,
  });

  // Busca todas as categorias para renderizar no select (corrigido para /categorias)
  async function buscarCategorias() {
    try {
      await buscar("/categoria", setCategorias);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar as categorias.", "erro");
    }
  }

  // Busca o produto por ID caso seja uma edição (corrigido para /produto ou /produtos conforme sua API)
  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produto/${id}`, setProduto);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar o produto selecionado.", "erro");
    }
  }

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  // Sincroniza o estado do select de categorias
  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoriaSelecionada.id === 0 ? null : categoriaSelecionada,
    });
  }, [categoriaSelecionada]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "calorias" ? Number(value) : value,
    }));
  }

  async function salvarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/produto`, produto, setProduto);
        ToastAlerta("Produto atualizado com sucesso!", "sucesso");
        retornar();
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar o Produto.", "erro");
      }
    } else {
      try {
        await cadastrar(`/produto`, produto, setProduto);
        ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
        retornar();
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar o Produto.", "erro");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/produto");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-[80vh] px-4 py-8">
      <form
        onSubmit={salvarProduto}
        className="w-full max-w-lg flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-md border border-[#bbf7d0]"
      >
        <h1 className="text-3xl font-black text-center text-[#042f17]">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="nome" className="font-bold text-[#042f17] text-sm">
            Nome do Produto
          </label>
          <input
            type="text"
            placeholder="Ex: Hambúrguer Artesanal, Suco Natural de Laranja"
            name="nome"
            required
            className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white"
            value={produto.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="foto" className="font-bold text-[#042f17] text-sm">
            Foto (Endereço URL)
          </label>
          <input
            type="text"
            placeholder="https://exemplo.com/imagem.jpg"
            name="foto"
            className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white"
            value={produto.foto || ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="preco" className="font-bold text-[#042f17] text-sm">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              name="preco"
              required
              className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white"
              value={produto.preco || ""}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="calorias"
              className="font-bold text-[#042f17] text-sm"
            >
              Calorias (kcal)
            </label>
            <input
              type="number"
              placeholder="Ex: 350"
              name="calorias"
              required
              className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white"
              value={produto.calorias || ""}
              onChange={atualizarEstado}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="descricao"
            className="font-bold text-[#042f17] text-sm"
          >
            Descrição
          </label>
          <textarea
            placeholder="Descreva os ingredientes ou detalhes do produto..."
            name="descricao"
            required
            rows={3}
            className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white resize-none"
            value={produto.descricao}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="categoria"
            className="font-bold text-[#042f17] text-sm"
          >
            Categoria do Produto
          </label>
          <select
            name="categoria"
            required
            className="border border-[#bbf7d0] rounded-xl p-3 focus:outline-none focus:border-[#0b8e44] text-slate-800 bg-white"
            onChange={(e) => {
              const catId = Number(e.target.value);
              const catEncontrada = categorias.find((c) => c.id === catId);
              if (catEncontrada) {
                setCategoriaSelecionada(catEncontrada);
              }
            }}
            value={produto.categoria?.id || ""}
          >
            <option value="">Selecione uma Categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !produto.categoria}
          className="w-full mt-2 bg-[#0b8e44] hover:bg-[#075f2d] disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex justify-center items-center"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
