import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      {/* Altere bg-[#022110] para bg-white aqui embaixo */}
      <div className="flex flex-col min-h-screen bg-white text-[#042f17]">
        <Navbar />
        
        <div className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<h1 className="text-3xl font-bold p-8">Página de Categorias</h1>} />
            <Route path="/produtos" element={<h1 className="text-3xl font-bold p-8">Página de Produtos</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App