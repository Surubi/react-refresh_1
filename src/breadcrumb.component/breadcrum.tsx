export const Breadcrumb = ({ items }: { items: string[] }) => {
    return (
        <nav className="flex px-5 py-3 text-white border border-gray-200 rounded-lg bg-gray-50 dark:bg-skyblue-800 dark:border-gray-700" aria-label="Breadcrumb">  
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    
                    <li key={index} className="text-sm text-gray-600">
                        {index > 0 ? " > "+item : item}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
