import BtnAddCart from "@/components/ListItem/btnAdd-cart";
import { render, screen } from "@testing-library/react";

describe('Testing BtnAddCart', () => {
    let totalQuantity = 0;
    const addCart = jest.fn();
    const decCart = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component when quantity 0', () => {
        render(<BtnAddCart totalCheckout={totalQuantity} handleAddcart={addCart} decreaseCart={decCart} />);

        // const btnDecrease = screen.getByText('-');
        // const btnAdd = screen.getByText('+');
        const btnAddCart = screen.getByText(/Add Cart/);
        expect(btnAddCart).toBeInTheDocument();

    });

    test('render all component when quantity 1', () => {
        totalQuantity = 10;
        render(<BtnAddCart totalCheckout={totalQuantity} handleAddcart={addCart} decreaseCart={decCart} />);

        const btnDecrease = screen.getByText('-');
        const btnAdd = screen.getByText('+');
        const quantity = screen.getByText(totalQuantity);

        expect(btnDecrease).toBeInTheDocument();
        expect(btnAdd).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
    })
})