import { render, screen, fireEvent } from '@testing-library/react';
import CategoryHome from '@/components/Home/Category-home';
import { Category } from '@/types/interfaces';

describe('CategoryHome Component', () => {
    const mockCategory: Category = {
        id: 1,
        name: 'Electronics',
        image: '/images/electronics.png',
        slug: 'electronics',
        creationAt: '2025-01-01',
        updatedAt: '2025-01-02',
    };

    const mockHandleRouter = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders CategoryHome with correct content', () => {
        render(<CategoryHome gethandleRouter={mockHandleRouter} categoryProd={mockCategory} />);

        expect(screen.getByText(/The Best/)).toHaveTextContent('The Best Electronics');
        expect(screen.getByText('Waiting For You')).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /Shop Electronics/i });
        expect(button).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '/images/electronics.png');
    });

    test('calls gethandleRouter with correct slug when button is clicked', () => {
        render(<CategoryHome gethandleRouter={mockHandleRouter} categoryProd={mockCategory} />);

        const button = screen.getByRole('button', { name: /Shop Electronics/i });
        fireEvent.click(button);

        expect(mockHandleRouter).toHaveBeenCalledWith('electronics');
        expect(mockHandleRouter).toHaveBeenCalledTimes(1);
    });

    test('renders fallback image when categoryProd.image is undefined', () => {
        const categoryWithoutImage: Category = {
        id: 2,
        name: 'Clothing',
        image: "",
        slug: 'clothing',
        };

        render(<CategoryHome gethandleRouter={mockHandleRouter} categoryProd={categoryWithoutImage} />);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '/no-img.jpg');
    });

    test('renders component correctly with given category', () => {
        render(<CategoryHome gethandleRouter={mockHandleRouter} categoryProd={mockCategory} />);

        expect(screen.getByText(/The Best/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Electronics/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Waiting For You/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCategory.image);
    });

});
