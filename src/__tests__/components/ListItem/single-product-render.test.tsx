import SingleProductRender from "@/components/ListItem/single-product-render";
import { fireEvent, render, screen } from "@testing-library/react";

const mockProduct = {
    id: 4,
    title: 'Big Boss Jacket',
    price: 100,
    description: 'This is Jacket made you like a boss',
    images: ['b.jpg', 'o.jpg', 's.jpg'],
    category: {
        id: 1,
        name: 'Clothes',
        image: '/images/clothes.png',
        slug: 'clothes',
        creationAt: '2025-01-01',
        updatedAt: '2025-01-02',
    }
};
let mockCart = [{
    product: mockProduct,
    quantity: 2
}]
const mockDecreaseCart = jest.fn();
const mockAddCart = jest.fn();
jest.mock('@/app/context/Cart-context', () => ({
    useCart: () => ({
        decReaseItem: mockDecreaseCart,
        addToCart: mockAddCart,
        cart: mockCart,
    })
}));
jest.mock('@/components/ListItem/btnAdd-cart' ,() => {
    const customBtnAddCart = ({ totalCheckout, handleAddcart, decreaseCart }: { totalCheckout: number, handleAddcart: () => void, decreaseCart: () => void }) => (
    <div>
        <button data-testid="mockMinus" onClick={decreaseCart}>minus</button>
        <p>{totalCheckout}</p>
        <button data-testid="mockPlus" onClick={handleAddcart}>plus</button>
    </div>);
    customBtnAddCart.displayName = 'customBtnAddCart';
    return {
        __esModule: true,
        default: customBtnAddCart,
    };
});

describe('test SingleProductRender', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component', () => {
        render(<SingleProductRender product={mockProduct} images={mockProduct.images} />);
        
        const leftSlide = screen.getByTestId('slideLeft');
        const rightSlide = screen.getByTestId('slideRight');
        const imageProd = screen.getByRole('img');
        const titleProd = screen.getByText(mockProduct.title);
        const categoryProd = screen.getByText(`Category: ${mockProduct.category.name}`);
        const decripProd = screen.getByText(mockProduct.description);
        const priceProd = screen.getByText(`$${mockProduct.price}`);
        
        expect(leftSlide).toBeInTheDocument();
        expect(rightSlide).toBeInTheDocument();
        expect(imageProd).toHaveAttribute('src', mockProduct.images[0]);
        expect(titleProd).toBeInTheDocument();
        expect(categoryProd).toBeInTheDocument();
        expect(decripProd).toBeInTheDocument();
        expect(priceProd).toBeInTheDocument()
    });

    test('btnAddCart one time click', () => {
        render(<SingleProductRender product={mockProduct} images={mockProduct.images} />);
        
        const addCart = screen.getByTestId('mockPlus');
        const decreaseCart = screen.getByTestId('mockMinus');

        fireEvent.click(addCart);
        fireEvent.click(decreaseCart);

        expect(mockAddCart).toHaveBeenCalledWith(mockProduct);
        expect(mockDecreaseCart).toHaveBeenCalledWith(mockProduct);
        expect(mockAddCart).toHaveBeenCalledTimes(1);
        expect(mockDecreaseCart).toHaveBeenCalledTimes(1);

    });
    
    test('test slide image product', () => {
        render(<SingleProductRender product={mockProduct} images={mockProduct.images} />);
        // test image index 0
        const imageProd = screen.getByRole('img');
        const leftSlide = screen.getByTestId('slideLeft');
        const rightSlide = screen.getByTestId('slideRight');
        expect(imageProd).toHaveAttribute('src', mockProduct.images[0]);

        fireEvent.click(rightSlide);
        expect(imageProd).toHaveAttribute('src', mockProduct.images[1]);

        fireEvent.click(leftSlide);
        expect(imageProd).toHaveAttribute('src', mockProduct.images[0]);

        fireEvent.click(rightSlide);
        fireEvent.click(rightSlide);
        expect(imageProd).toHaveAttribute('src', mockProduct.images[2]);

        fireEvent.click(leftSlide);
        fireEvent.click(leftSlide);
        expect(imageProd).toHaveAttribute('src', mockProduct.images[0]);

    });
})