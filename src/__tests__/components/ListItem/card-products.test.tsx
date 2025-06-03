import CardProduct from "@/components/ListItem/card-products";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Testing card-product', () => {
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
    const mockHandleRouter = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component', () => {
        render(<CardProduct product={mockProduct} handleRouter={mockHandleRouter} />);

        const imageProduct = screen.getByRole('img');
        const titleProduct = screen.getByText(mockProduct.title);
        const catProduct = screen.getByText(`Category: ${mockProduct.category.name}`);
        const desProduct = screen.getByText(mockProduct.description);
        const priceProduct = screen.getByText(`$${mockProduct.price}`);
        const btnDetail = screen.getByRole('button');

        expect(imageProduct).toBeInTheDocument();
        expect(imageProduct).toHaveAttribute('src', mockProduct.images[0]);
        expect(titleProduct).toBeInTheDocument();
        expect(catProduct).toBeInTheDocument();
        expect(desProduct).toBeInTheDocument();
        expect(priceProduct).toBeInTheDocument();
        expect(btnDetail).toBeInTheDocument();
    });

    test('test click Product Detail', () => {
        render(<CardProduct product={mockProduct} handleRouter={mockHandleRouter} />);

        const btnDetail = screen.getByRole('button');

        fireEvent.click(btnDetail);
        expect(mockHandleRouter).toHaveBeenCalledTimes(1);
    })

})