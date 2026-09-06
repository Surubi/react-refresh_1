interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 -mx-4 overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 px-4 py-4 text-white shadow-md">
      <div className="border-l-4 border-cyan-200 pl-3">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm font-medium text-blue-100">{description}</p>
        )}
      </div>
    </div>
  );
};
