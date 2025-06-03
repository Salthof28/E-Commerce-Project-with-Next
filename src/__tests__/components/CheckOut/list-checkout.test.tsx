import ListCheckOut from "@/components/CheckOut/list-checkout";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartItem } from "@/app/context/Cart-context";
// import { useCart } from "@/app/context/Cart-context";

describe('Test list-checkout', () => {
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
    }
    const mockCart: CartItem = {
        product: mockProduct,
        quantity: 3,
    }

    const mockRemoveCart = jest.fn();
    const mockDecreaseCart = jest.fn();
    const mockAddCart = jest.fn();

    jest.mock('@/app/context/Cart-context', () => ({
        useCart: () => ({
            removeCart: mockRemoveCart,
            decreaseCart: mockDecreaseCart,
            handleAddcart: mockAddCart
        })
    }))

    beforeEach (() => {
        jest.clearAllMocks();
    })

    test('render all component with mockCart', () => {
        render(<ListCheckOut cart={mockCart} handleAddcart={mockAddCart} decreaseCart={mockDecreaseCart} removeCart={mockRemoveCart} />);

        const imageProd = screen.getByRole('img');
        const titleProd = screen.getByText(mockCart.product.title);
        const priceProd = screen.getByTestId('quantity');
        const quntity = screen.getByText(mockCart.quantity);
        const btnRemoveProd = screen.getByTestId('btnRemoveCart');
        const btnDecreaseProd = screen.getByTestId('btnDecreaseCart');
        const btnAddProd = screen.getByTestId('btnAddCart');

        expect(imageProd).toHaveAttribute('src', mockCart.product.images[0]);
        expect(imageProd).toHaveAttribute('alt', mockCart.product.title);
        expect(titleProd).toBeInTheDocument();
        expect(priceProd).toHaveTextContent('$100');
        expect(quntity).toBeInTheDocument();
        expect(btnRemoveProd).toBeInTheDocument();
        expect(btnDecreaseProd).toBeInTheDocument();
        expect(btnAddProd).toBeInTheDocument();
    })

    test('call all button 1 time', () => {
        render(<ListCheckOut cart={mockCart} handleAddcart={mockAddCart} decreaseCart={mockDecreaseCart} removeCart={mockRemoveCart} />);

        // const quntity = screen.getByText(mockCart.quantity);
        const btnRemoveProd = screen.getByTestId('btnRemoveCart');
        const btnDecreaseProd = screen.getByTestId('btnDecreaseCart');
        const btnAddProd = screen.getByTestId('btnAddCart');
        
        fireEvent.click(btnRemoveProd);
        fireEvent.click(btnDecreaseProd);
        fireEvent.click(btnAddProd);

        expect(mockRemoveCart).toHaveBeenCalledTimes(1);
        expect(mockDecreaseCart).toHaveBeenCalledTimes(1);
        expect(mockAddCart).toHaveBeenCalledTimes(1);
    })
})