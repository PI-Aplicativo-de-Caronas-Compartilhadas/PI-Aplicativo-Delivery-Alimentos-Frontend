import { NavLink } from "react-router-dom";
import { Fire, ArrowRight, ArrowClockwise, Coffee, BowlFood, CookingPot, AppleLogo } from "@phosphor-icons/react";
import ClimaNavbar from "../../components/navbar/ClimaNavbar";

function Home() {
    return (
        <div className="w-full bg-white text-[#042f17] py-8 px-8 flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col gap-8">
                
                {/* Saudação Inicial + Clima Local (Distribuição Flex) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-black text-[#042f17]">
                            Olá!
                        </h1>
                        <p className="text-sm md:text-base text-[#075f2d] font-medium">
                            Pronto para sua próxima refeição saudável?
                        </p>
                    </div>
                    
                    {/* Exibe o Clima alinhado ao lado direito */}
                    <div className="self-start sm:self-center">
                        <ClimaNavbar />
                    </div>
                </div>

                {/* Recomendação do Dia (Destaque Principal) */}
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
                            <NavLink to="/produtos" className="bg-[#0b8e44] hover:bg-[#075f2d] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm text-sm flex items-center gap-2">
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

                {/* Sugestões Rápidas (Grade de Pratos) */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#042f17]">Sugestões Rápidas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { nome: 'Salada', kcal: '300 kcal' },
                            { nome: 'Smoothie', kcal: '200 kcal' },
                            { nome: 'Wrap', kcal: '350 kcal' },
                            { nome: 'Omelete', kcal: '250 kcal' },
                            { nome: 'Sopa', kcal: '150 kcal' },
                            { nome: 'Frutas', kcal: '100 kcal' },
                            { nome: 'Poke', kcal: '400 kcal' },
                            { nome: 'Peixe', kcal: '300 kcal' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden border border-[#bbf7d0] shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                <div className="h-32 bg-[#f0fdf4] flex items-center justify-center overflow-hidden">
                                    <img src="/bowl-salada.jpeg" alt={item.nome} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3.5 flex flex-col items-center text-center">
                                    <span className="font-bold text-sm text-[#042f17]">{item.nome}</span>
                                    <span className="text-xs text-[#0b8e44] font-semibold mt-0.5">{item.kcal}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;