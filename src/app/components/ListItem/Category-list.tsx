interface CategoryFilterProps {
    handleCategory: (category: string) => void;
}

export default function CategoryList ({handleCategory}: CategoryFilterProps) {
    return (
        <section className="p-2 w-[9rem] xl:w-[18rem] 2xl:w-[16rem] bg-amber-50 rounded-2xl h-full text-start hidden lg:block">
            <h2 className="text-[0.8rem] xl:text-[1rem] text-black font-bold mb-[1rem]">Category Product</h2>
            <div className="flex flex-col items-start">
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("All")}>All</button>
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("Electronics")}>Electronics</button>
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("Clothes")}>Clothes</button>
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("Furniture")}>Furniture</button>
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("Shoes")}>Shoes</button>
                <button className="p-1 text-black hover:bg-gray-100 focus:bg-emerald-500 focus:text-white text-[0.8rem] xl:text-[1rem]" onClick={() => handleCategory("Miscellaneous")}>Miscellaneous</button>
            </div>
        </section>
    );
};