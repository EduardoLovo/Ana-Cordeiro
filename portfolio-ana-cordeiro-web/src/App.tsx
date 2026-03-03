// portfolio-ana-cordeiro-web/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importação correta
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";

function App() {
  return (
    // Use BrowserRouter como o container principal
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          {/* Use Routes para envolver suas rotas individuais */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            {/* Rota dinâmica para os detalhes */}
            <Route path="/projetos/:id" element={<ProjectDetails />} />
            {/* ... outras rotas */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
