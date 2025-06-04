import HeaderTable from "@/components/Dashboard/HeaderTable";
import { render, screen } from "@testing-library/react";

describe('Testing HeaderTable', () => {
    const mockHeaders = ['Product', 'Price', 'Category', 'Action'];
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component refernce mockHeaders', () => {
        render(<HeaderTable headers={mockHeaders} />);

        const headerProduct = screen.getByText(/Product/i);
        const headerPrice = screen.getByText(/Price/i);
        const headerCategory = screen.getByText(/Category/i);
        const headerAction = screen.getByText(/Action/i);

        expect(headerProduct).toBeInTheDocument();
        expect(headerPrice).toBeInTheDocument();
        expect(headerCategory).toBeInTheDocument();
        expect(headerAction).toBeInTheDocument();

    })
})