'use client'
type CategoryProduct = {
    id: number;
    name: string;
    image: string;
    slug: string;
    creationAt: string;
    updatedAt: string;
  }
interface CategoryHome {
    gethandleRouter: (category: string) => void;
    categoryProd: CategoryProduct
}
export default function CategoryHome ({gethandleRouter, categoryProd}: CategoryHome) {
    return (
        <div className="relative flex flex-col items-start bg-cover bg-center rounded-2xl bg-black flex-shrink-0 justify-center p-[0.8rem] md:p-[2rem] pb-[4rem] w-[10rem] h-[15rem] md:w-[15rem] md:h-[20rem] lg:w-[25rem] lg:h-[30rem]">
            <img className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40" src={categoryProd?.image || "/no-img.jpg"} />
            <h1 className="z-10 text-amber-50 text-md md:text-xl lg:text-4xl">The Best <span className="text-xs md:text-xs lg:text-2xl">{categoryProd?.name}</span></h1>
            <h3 className="z-10 text-amber-50 text-xs md:text-xs lg:text-xl">Waiting For You</h3>
            <button className="z-10 bg-yellow-500 p-1 rounded-md hover:bg-yellow-500 hover:text-amber-50 active:scale-80 duration-200 text-xs md:text-sm lg:text-md" onClick={() => gethandleRouter(categoryProd?.name)}>Shop {categoryProd?.name}</button>
        </div>
    );
}

// bg-[linear-gradient(rgba(184,74,0,0.2)_80%,rgb(184,74,0)),url('/uul.jpeg')]