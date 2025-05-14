interface CategoryFilterProps {
    handleCategory: (category: string) => void;
}

export default function CategoryList ({handleCategory}: CategoryFilterProps) {
    return (
        <section className="p-2 w-[10%] bg-amber-50 rounded-2xl h-[18rem] text-start">
            <h2>Category Product</h2>
            <div className="flex flex-col items-start">
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("All")}>All</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Electronics")}>Electronics</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Clothes")}>Clothes</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Furniture")}>Furniture</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Shoes")}>Shoes</button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Miscellaneous")}>Miscellaneous</button>
            </div>
        </section>
    );
};