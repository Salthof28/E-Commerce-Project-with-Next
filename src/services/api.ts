
export interface Users {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}
export interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
    creationAt: string;
    updatedAt: string;
}
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
}

const API_BASE_URL = 'https://api.escuelajs.co/api/v1'
// fetching data products
export async function fetchDataProd (): Promise<Product[]> {
    const response: Response = await fetch(`${API_BASE_URL}/products`)
    return response.json();
}
export async function fetchFilterCatProd (slug: string): Promise<Product[]> {
    const response: Response = await fetch(`${API_BASE_URL}/products/?categorySlug=${slug}`)
    return response.json();
}
// fetching data category
export async function fetchDataCat (): Promise<Category[]> {
    const response: Response = await fetch(`${API_BASE_URL}/categories`)
    return response.json();
}
// fetchind data single product
export async function fetchDataSingProd (id: string): Promise<Product> {
    const response: Response = await fetch(`${API_BASE_URL}/products/${id}`)
    return response.json();
}
// for paganation page
export async function fetchDataProdPag (offset: number, productPerPage: number, search: string): Promise<Product[]> {
    const response: Response = await fetch(`${API_BASE_URL}/products?offset=${offset}&limit=${productPerPage}${search ? `&title=${encodeURIComponent(search)}` : ``}`);
    return response.json();
}
// for count lengt data
export async function CountLengDataProd (search: string): Promise<number> {
    const response: Response = await fetch(`${API_BASE_URL}/products${search ? `?title=${encodeURIComponent(search)}` : ``}`)
    const data: Product[] = await response.json();
    return data.length;
}