import { fetchDataCat } from "../services/api";
import { Category } from "@/types/interfaces";
import HomeClient from "@/components/Home/Home-client";
export const revalidate = 3600; // ISR every 1 hour
export default async function Home() {

  const category: Category[] = await fetchDataCat();

  return <HomeClient category={category} />
}
