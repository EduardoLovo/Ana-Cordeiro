import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";

// Criamos um Layout para que o Header e o Footer apareçam em todas as páginas
function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="grow">
        <Outlet />{" "}
        {/* Aqui é onde as páginas (Home, Contact, etc) serão renderizadas */}
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contato",
        element: <Contact />,
      },
      {
        path: "/sobre",
        element: <About />,
      },
      {
        path: "/projetos",
        element: <Projects />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
