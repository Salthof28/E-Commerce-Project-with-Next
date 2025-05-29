import { Category } from "@/services/api";

interface CategoryFilterProps {
    handleCategory: (category: string) => void;
    category: Category;
    activeCat: string
}

export default function CategoryList ({handleCategory, category, activeCat}: CategoryFilterProps) {
    return (
        <button className={`p-1 hover:bg-emerald-400 ${activeCat === category.slug ? 'bg-emerald-600' : 'bg-amber-50'} ${activeCat === category.slug ? 'text-white' : 'text-black'} text-[0.8rem] xl:text-[1rem]`} onClick={() => handleCategory(category.slug)}>{category.name}</button>
    );
};