
export interface FormDataProduct {
    images: string[];
    title: string;
    price: string | number;
    description: string;
    categoryId: number;
}
export interface FormDataUsers {
    email: string,
    password?: string,
    name: string,
    role?: string,
    avatar: string,
}
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