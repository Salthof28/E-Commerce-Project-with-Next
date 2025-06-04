import Home from "@/app/page";
import { fetchDataCat } from "@/services/api";
import { Category } from "@/types/interfaces";
import { render, screen } from "@testing-library/react";

jest.mock('@/services/api', () => ({
    fetchDataCat: jest.fn(),
}));
jest.mock('@/components/Home/Home-client', () => {
    const customBtnAddCart = ({ category }: { category: Category[] }) => (
    <div data-testid="home-client">Category Count: {category.length}</div>);
    customBtnAddCart.displayName = 'customBtnAddCart';
    return {
        __esModule: true,
        default: customBtnAddCart,
    };
} )

describe('Testing Home Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetching category home', async () => {
        const mockCat = [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Clothes' }
        ];

        (fetchDataCat as jest.Mock).mockResolvedValue(mockCat);
        
        const HomeComponent = await Home();
        render(HomeComponent);
        expect(await screen.findByTestId('home-client')).toHaveTextContent('Category Count: 2');
    });
})