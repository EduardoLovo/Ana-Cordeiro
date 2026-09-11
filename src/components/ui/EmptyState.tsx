/**
 * ESTADO VAZIO — mensagem amigável quando ainda não há conteúdo cadastrado.
 */
type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-gray-200 px-6 py-20 text-center">
      <p className="text-xl font-light text-gray-900">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
