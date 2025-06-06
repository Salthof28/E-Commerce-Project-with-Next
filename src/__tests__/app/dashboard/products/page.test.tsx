import ProductHandlePage from "@/app/dashboard/products/page";
import { fetchDataProdPag, fetchDataCat, CountLengDataProd } from "@/services/api";
import { render,screen } from "@testing-library/react";

jest.mock('@/services/api', () => ({
  fetchDataProdPag: jest.fn(),
  fetchDataCat: jest.fn(),
  CountLengDataProd: jest.fn(),
}));
interface InitialDataType {
    currentPage: number,
    searchTerm: string,
    productsPerPage: number,
    offset: number,
    products: { id: number; name: string }[],
    category: { id: number; name: string }[],
    totalPage: number,
};

jest.mock('@/app/dashboard/products/ListProductClient', () => {
    const mockProductHandlePageClient = ({ initialData }: { initialData: InitialDataType }) => (
        <div>
            <div>Mock ProductHandlePageClient</div>
            <div>Products: {initialData.products.length}</div>
        </div>
    );
    mockProductHandlePageClient.displayName = 'mockProductHandlePageClient';
    return {
        __esModule: true,
        default: mockProductHandlePageClient,
    };
});

describe("ProductHandlePage (Server Component)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("renders product client with fetched data", async () => {
        (fetchDataProdPag as jest.Mock).mockResolvedValue([{ id: 1, name: "Product A" }]);
        (fetchDataCat as jest.Mock).mockResolvedValue([{ id: 1, name: "Category A" }]);
        (CountLengDataProd as jest.Mock).mockResolvedValue(1);

        render(await ProductHandlePage());

        expect(screen.getByText("Mock ProductHandlePageClient")).toBeInTheDocument();
        expect(screen.getByText("Products: 1")).toBeInTheDocument();
    });

    test("shows error message when fetch fails", async () => {
        (fetchDataProdPag as jest.Mock).mockRejectedValue(new Error("API error"));
        (fetchDataCat as jest.Mock).mockResolvedValue([]);
        (CountLengDataProd as jest.Mock).mockResolvedValue(0);

        render(await ProductHandlePage());

        expect(screen.getByText("Error Loading Products")).toBeInTheDocument();
        expect(screen.getByText("Please try again later")).toBeInTheDocument();
    });
});