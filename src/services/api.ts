import { Users, Category, Product } from "@/types/interfaces";

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
// for paganation page (product)
export async function fetchDataProdPag (offset: number, productPerPage: number, search: string): Promise<Product[]> {
    const response: Response = await fetch(`${API_BASE_URL}/products?offset=${offset}&limit=${productPerPage}${search ? `&title=${encodeURIComponent(search)}` : ``}`);
    return response.json();
}
export async function fetchUsers (): Promise<Users[]> {
    const response: Response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
}
// for count lengt data (product)
export async function CountLengDataProd (search: string): Promise<number> {
    const response: Response = await fetch(`${API_BASE_URL}/products${search ? `?title=${encodeURIComponent(search)}` : ``}`)
    const data: Product[] = await response.json();
    return data.length;
}
export async function CountLengDataUsers (search: string): Promise<number> {
    const response: Response = await fetch(`${API_BASE_URL}/users${search ? `?title=${encodeURIComponent(search)}` : ``}`)
    const data: Users[] = await response.json();
    return data.length;
}