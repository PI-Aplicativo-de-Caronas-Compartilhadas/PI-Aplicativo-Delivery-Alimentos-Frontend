import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import "./index.css";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";

function App() {
  return (
    <BrowserRouter>
      {/* Altere bg-[#022110] para bg-white aqui embaixo */}
      <div className="flex flex-col min-h-screen bg-white text-[#042f17]">
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Rotas Principais */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            
            {/* Rotas de Categoria */}
            <Route path="/categoria" element={<ListaCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

            {/* Rotas de Produto adicionadas aqui */}
            <Route path="/produto" element={<ListaProdutos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;