import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Fire, ArrowRight, ArrowClockwise, Coffee, BowlFood, CookingPot, AppleLogo } from "@phosphor-icons/react";
import type Produto from "../../models/Produto";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlera";

function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function buscarProdutos() {
        try {
            await buscar("/produto", setProdutos);
        } catch (error: any) {
            ToastAlerta("Erro ao carregar os produtos.", "erro");
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    // Função auxiliar modificada para retornar o logo.png como padrão
    function obterImagemProduto(descricao?: string) {
        if (!descricao) return "/logo.png";
        if (descricao.includes("|")) {
            const partes = descricao.split("|");
            return partes[1]?.trim() || "/logo.png";
        }
        return "/logo.png";
    }

    return (
        <div className="w-full bg-white text-[#042f17] py-8 px-8 flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col gap-8">
                
                {/* Saudação Inicial */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-black text-[#042f17]">
                        Olá!
                    </h1>
                    <p className="text-sm md:text-base text-[#075f2d] font-medium">
                        Pronto para sua próxima refeição saudável?
                    </p>
                </div>

                {/* Recomendação do Dia */}
                <div className="bg-[#f0fdf4] text-[#042f17] p-6 md:p-8 rounded-2xl border border-[#bbf7d0] shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="w-full lg:w-1/3 h-48 rounded-xl overflow-hidden bg-white border border-[#bbf7d0]">
                        <img 
                            src="/bowl-salada.jpeg" 
                            alt="Bowl de Quinoa com Abacate" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <span className="text-[10px] font-extrabold text-[#0b8e44] tracking-wider uppercase bg-[#dcfce7] py-1 px-2.5 rounded-md w-fit">
                            Recomendação do Dia
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-[#042f17]">Bowl de Quinoa com Abacate</h2>
                        
                        <div className="flex flex-wrap gap-3 text-xs font-bold text-[#075f2d] bg-[#dcfce7]/70 py-2 px-3.5 rounded-lg w-fit">
                            <span className="flex items-center gap-1"><Fire size={15} weight="fill" className="text-[#f97316]" /> 450 kcal</span>
                            <span>|</span>
                            <span>35g Carb</span>
                            <span>|</span>
                            <span>20g Prot</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <NavLink to="/produto" className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm text-sm flex items-center gap-2">
                                Ver Detalhes <ArrowRight size={16} weight="bold" />
                            </NavLink>
                            <button className="text-[#0b8e44] hover:text-[#075f2d] font-bold text-xs flex items-center gap-1.5 transition-colors">
                                <ArrowClockwise size={16} weight="bold" /> Trocar Sugestão
                            </button>
                        </div>
                    </div>
                </div>

                {/* Explore por Categorias */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#042f17]">Explore por Categorias</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#fef9c3] text-[#042f17] p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-[#fde047]/40 hover:scale-105 transition-transform cursor-pointer">
                            <Coffee size={32} weight="duotone" className="text-[#854d0e]" />
                            <span className="font-bold text-sm">Café</span>
                        </div>
                        <div className="bg-[#ffedd5] text-[#042f17] p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-[#fed7aa]/40 hover:scale-105 transition-transform cursor-pointer">
                            <BowlFood size={32} weight="duotone" className="text-[#c2410c]" />
                            <span className="font-bold text-sm">Almoço</span>
                        </div>
                        <div className="bg-[#e0f2fe] text-[#042f17] p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-[#bae6fd]/40 hover:scale-105 transition-transform cursor-pointer">
                            <CookingPot size={32} weight="duotone" className="text-[#0369a1]" />
                            <span className="font-bold text-sm">Jantar</span>
                        </div>
                        <div className="bg-[#f3e8ff] text-[#042f17] p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-[#e9d5ff]/40 hover:scale-105 transition-transform cursor-pointer">
                            <AppleLogo size={32} weight="duotone" className="text-[#7e22ce]" />
                            <span className="font-bold text-sm">Lanches</span>
                        </div>
                    </div>
                </div>

                {/* Sugestões Rápidas (Produtos dinâmicos reais) */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#042f17]">Sugestões Rápidas</h3>
                    
                    {produtos.length === 0 ? (
                        <div className="text-center py-10 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] p-6">
                            <p className="text-sm text-gray-500 font-medium">Nenhum produto cadastrado no momento.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {produtos.slice(0, 8).map((item) => (
                                <NavLink to="/produto" key={item.id} className="bg-white rounded-xl overflow-hidden border border-[#bbf7d0] shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                                    <div className="h-32 bg-[#f0fdf4] flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={obterImagemProduto(item.descricao)} 
                                            alt={item.nome} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/logo.png";
                                            }}
                                        />
                                    </div>
                                    <div className="p-3.5 flex flex-col items-center text-center">
                                        <span className="font-bold text-sm text-[#042f17] line-clamp-1">{item.nome}</span>
                                        <span className="text-xs text-[#0b8e44] font-semibold mt-0.5">{item.calorias} kcal</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Home;