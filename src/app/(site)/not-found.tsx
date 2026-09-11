/**
 * PÁGINA 404 — mantém o cabeçalho/rodapé e oferece um caminho de volta.
 */
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-6xl font-light tracking-tighter text-gray-900">
        404
      </span>
      <h1 className="mt-4 text-2xl font-light text-gray-800">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <div className="mt-8">
        <Button href="/">Voltar ao início</Button>
      </div>
    </div>
  );
}
