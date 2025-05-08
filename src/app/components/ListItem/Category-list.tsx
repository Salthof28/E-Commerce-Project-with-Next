interface CategoryFilterProps {
    handleCategory: (category: string) => void;
}

export default function CategoryList ({handleCategory}: CategoryFilterProps) {
    return (
        <section className="p-2 w-[12rem] bg-amber-50 rounded-2xl h-[18rem] text-start">
            <h1>Category Products</h1>
            <div className="flex flex-col items-start">
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("All")}>All</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Electronics")}>Electronics</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Clothes")}>Clothes</button>
            </div>
        </section>
    );
};