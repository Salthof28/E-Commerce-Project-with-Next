
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react'; // Diperbarui dari react-dom/test-utils
import HomeClient from '@/components/Home/Home-client';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/interfaces';

// Mock dependensi
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/components/navbar', () => () => <div data-testid="navbar">Mocked Navbar</div>);

jest.mock('@/components/Home/Category-home', () => ({ categoryProd, gethandleRouter }: { categoryProd: Category, gethandleRouter: (category: string) => void }) => (
  <div data-testid={`category-${categoryProd.slug}`}>
    <h1>The Best {categoryProd.name}</h1>
    <button onClick={() => gethandleRouter(categoryProd.slug)}>Shop {categoryProd.name}</button>
  </div>
));

// Mock scrollBy pada HTMLDivElement
const mockScrollBy = jest.fn();
beforeAll(() => {
  // Tambahkan scrollBy ke prototipe HTMLDivElement
  Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
    configurable: true,
    value: mockScrollBy,
  });
});

afterAll(() => {
  // Bersihkan mock scrollBy
  delete (HTMLElement.prototype as any).scrollBy;
});

describe('HomeClient Component', () => {
  const mockCategories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
      image: '/images/electronics.png',
      slug: 'electronics',
      creationAt: '2025-01-01',
      updatedAt: '2025-01-02',
    },
    {
      id: 2,
      name: 'Clothing',
      image: '/images/clothing.png',
      slug: 'clothing',
      creationAt: '2025-01-01',
      updatedAt: '2025-01-02',
    },
  ];

  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockScrollBy.mockClear();
  });

  test('renders Navbar and section elements correctly', () => {
    render(<HomeClient category={mockCategories} />);

    // check Navbar
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // check elemen section Home
    expect(screen.getByText(/Hurry Up/i)).toBeInTheDocument();
    expect(screen.getByText(/The Best Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting For You/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shop Now/i })).toBeInTheDocument();

    // check section Category
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right')).toBeInTheDocument();

    // check rendering CategoryHome
    expect(screen.getByTestId('category-electronics')).toBeInTheDocument();
    expect(screen.getByTestId('category-clothing')).toBeInTheDocument();
  });

  test('navigates to /ListItem?category=All when Shop Now button is clicked', () => {
    render(<HomeClient category={mockCategories} />);

    const shopNowButton = screen.getByRole('button', { name: /Shop Now/i });
    fireEvent.click(shopNowButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/ListItem?category=All');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });

  test('calls handleSlider with correct direction when arrow buttons are clicked', () => {
    render(<HomeClient category={mockCategories} />);

    const leftButton = screen.getByTestId('arrow-left');
    const rightButton = screen.getByTestId('arrow-right');

    fireEvent.click(leftButton);
    expect(mockScrollBy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });

    fireEvent.click(rightButton);
    expect(mockScrollBy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  test('changes background image every 3 seconds via useEffect', async () => {
    jest.useFakeTimers();
    render(<HomeClient category={mockCategories} />);

    const section = screen.getByRole('main').firstElementChild?.firstElementChild as HTMLElement;
    expect(section).toHaveStyle({ backgroundImage: expect.stringContaining('/images/electronics.png') });

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(section).toHaveStyle({ backgroundImage: expect.stringContaining('/images/clothing.png') });
    });

    jest.useRealTimers();
  });

  test('calls gethandleRouter with correct slug when CategoryHome button is clicked', () => {
    render(<HomeClient category={mockCategories} />);

    const electronicsButton = screen.getByRole('button', { name: /Shop Electronics/i });
    fireEvent.click(electronicsButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/ListItem?category=electronics');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });
});
