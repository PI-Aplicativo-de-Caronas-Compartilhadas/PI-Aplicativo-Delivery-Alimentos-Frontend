import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='w-full h-16 bg-white text-[#042f17] px-8 flex justify-between items-center border-b border-[#d0fbe3] shadow-sm relative overflow-visible'>
            {/* Logo com altura h-34 e translate-y para centralizar o peso visual */}
            <NavLink to="/home" className="flex items-center relative z-10">
                <img 
                    src="/logo.png" 
                    alt="Logo Nutrigo" 
                    className="h-34 w-auto object-contain translate-y-2.5" 
                />
            </NavLink>

            {/* Links de Navegação */}
            <div className='flex gap-6 items-center'>
                <NavLink to="/home" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
                    Início
                </NavLink>
                <NavLink to="/categorias" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
                    Categorias
                </NavLink>
                <NavLink to="/produtos" className="text-[#042f17] hover:text-[#0b8e44] font-medium text-base">
                    Produtos
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar