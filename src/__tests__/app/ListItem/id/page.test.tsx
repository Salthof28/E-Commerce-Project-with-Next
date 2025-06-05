import SingleProduct from "@/app/ListItem/[id]/page";
import { render } from "@testing-library/react";
import { fetchDataSingProd } from "@/services/api";
import { Product } from "@/types/interfaces";

jest.mock('@/services/api', () => ({
    fetchDataSingProd: jest.fn(),
}));

jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar
});

jest.mock('@/components/ListItem/single-product-render', () => {
    const mockSingleProductRender = ({ product }: { product: Product }) => (
        <div data-testid="product-render">Product: {product.title}</div>
    );
    mockSingleProductRender.displayName = 'mockCardProduct';
    return {
        __esModule: true,
        default: mockSingleProductRender,
    };
});

describe('Testing SingleProduct', () => {
    const mockProduct = {
        id: 4,
        title: 'Jacket Dude',
        price: 100,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {id: 1, name: 'Clothes',}
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (fetchDataSingProd as jest.Mock).mockResolvedValue(mockProduct);
    });

    test('Render Product detil and send to componen', async () => {
        const Wrapper = await SingleProduct({ params: Promise.resolve({ id: '4' }) });
        const { findByTestId } = render(Wrapper);

        expect(await findByTestId('navbar')).toBeInTheDocument();
        expect(await findByTestId('product-render')).toHaveTextContent('Jacket Dude');
        expect(fetchDataSingProd).toHaveBeenCalledWith('4');
    })
})


