import CategoryList from "@/components/ListItem/Category-list";
import { Category } from "@/types/interfaces";
import { render, screen } from "@testing-library/react";

describe('Testing Category-list component', () => {

    const mockHandleCategory = jest.fn();
    const mockCategory: Category = {
        id: 1,
        name: 'Electronics',
        image: '/images/electronics.png',
        slug: 'electronics',
        creationAt: '2025-01-01',
        updatedAt: '2025-01-02',
    };
    let mockActiveCat = 'electronics';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render component when mockActiveCat like mockCategory.slug', () => {
        render(<CategoryList handleCategory={mockHandleCategory} category={mockCategory} activeCat={mockActiveCat} />);

        const btnCategory = screen.getByText(mockCategory.name);
        expect(btnCategory).toBeInTheDocument();
        expect(btnCategory).toHaveClass('bg-emerald-600 text-white');
    });
    
    test('render component when mockActiveCat unlike mockCategory.slug', () => {
        mockActiveCat = 'shoes';
        render(<CategoryList handleCategory={mockHandleCategory} category={mockCategory} activeCat={mockActiveCat} />);

        const btnCategory = screen.getByText(mockCategory.name);
        expect(btnCategory).toBeInTheDocument();
        expect(btnCategory).toHaveClass('bg-amber-50 text-black');
    });

})