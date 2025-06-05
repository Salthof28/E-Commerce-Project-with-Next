import ListItem from "@/app/ListItem/ListClient";
import { fetchDataCat, fetchDataProd, fetchFilterCatProd } from "@/services/api";
import { Category, Product } from "@/types/interfaces";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
// import { act } from "react";
import { act } from "@testing-library/react";
// mock category-list
jest.mock('@/components/ListItem/Category-list', () => {
    const mockCategoryList = ({ handleCategory, category, activeCat }: { handleCategory: () => void, category: Category, activeCat: string }) => (
    <div data-testid="Category-list" className={`${activeCat === category.slug ? 'bg-emerald-600' : 'bg-amber-50'}`} onClick={handleCategory}>{category.name}</div>);
    mockCategoryList.displayName = 'mockCategoryList';
    return {
        __esModule: true,
        default: mockCategoryList,
    };
});
// mock card-products
jest.mock('@/components/ListItem/card-products', () => {
    const mockCategoryList = ({ product }: { product: Product,  }) => (
    <div data-testid="card-products">Product is {product.title} </div>);
    mockCategoryList.displayName = 'mockCategoryList';
    return {
        __esModule: true,
        default: mockCategoryList,
    };
});
// mock navbar
jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar
});
// mock routera and useSearch Params
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useSearchParams: jest.fn()
}));
// mock fetchFilterCatProd, fetchDataProd, fetchDataCat
jest.mock('@/services/api', () => ({
    fetchFilterCatProd: jest.fn(),
    fetchDataProd: jest.fn(),
    fetchDataCat: jest.fn(),
}));

describe('Testing ListItem', () => {
    const mockProducts = [{
            id: 4,
            title: 'Big Boss Jacket',
            price: 100,
            description: 'This is Jacket made you like a boss',
            images: ['b.jpg', 'o.jpg', 's.jpg'],
            category: {id: 1, name: 'Clothes',}
        },
        {
            id: 5,
            title: 'Big Boss Jacket Tralala',
            price: 400,
            description: 'This is Jacket made you like a boss',
            images: ['b.jpg', 'o.jpg', 's.jpg'],
            category: {id: 1, name: 'Clothes',}
        },
        {
            id: 6,
            title: 'Big Boss Jacket Trilili',
            price: 120,
            description: 'This is Jacket made you like a boss',
            images: ['b.jpg', 'o.jpg', 's.jpg'],
            category: {id: 1, name: 'Clothes',}
        }
    ];
    const mockCategory = [{
            id: 1,
            name: 'Electronics',
            slug: 'electronics'
        },
        {
            id: 2,
            name: 'Clothes',
            slug: 'clothes',
        },
    ];
    
    beforeEach(() => {
        jest.clearAllMocks();
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('category=All'));
        (fetchDataProd as jest.Mock).mockResolvedValue(mockProducts);
        (fetchFilterCatProd as jest.Mock).mockResolvedValue(mockProducts);
        (fetchDataCat as jest.Mock).mockResolvedValue(mockCategory);
    });

    // test('Fetching All Product', async () => {  
    //     await act(async () => {
    //         render(<ListItem />);
    //     });
    //     expect(screen.getByText(/Loading..../i)).toBeInTheDocument();

    //     await waitFor(() => {
    //         expect(fetchDataProd).toHaveBeenCalled();
    //         expect(fetchDataCat).toHaveBeenCalled();
    //         expect(screen.getByText(/Product is Big Boss Jacket/i)).toBeInTheDocument(); 
    //     })
    // });
    
    test('render all component', () => {
            
        render(<ListItem />);

        const inptSearch = screen.getByTestId('inptSearch');
        const btnSearch = screen.getByTestId('btnSearch');
        const titlePanelCat = screen.getByText(/Category Product/i);
        const btnAllCat = screen.getByTestId('btnAllCat');
        const titleLoading = screen.getByText(/Loading..../i);

        expect(btnSearch).toBeInTheDocument();
        expect(titleLoading).toBeInTheDocument();
        expect(titlePanelCat).toBeInTheDocument();
        expect(inptSearch).toHaveValue('');
        expect(btnAllCat).toHaveClass('bg-emerald-500 text-white')
    });

    // test('test handleCategory with btnAllCat', () => {
    //     (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('category=electronics'));
    //     // First render
    //     const { rerender } = render(<ListItem />);
    //     const btnAllCat = screen.getByTestId('btnAllCat');
    //     expect(btnAllCat).toHaveClass('bg-amber-50 text-black');

    //     fireEvent.click(btnAllCat);
    //     // rerender
    //     (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('category=All'));
    //     rerender(<ListItem />);
    //     expect(btnAllCat).toHaveClass('bg-emerald-500 text-white');
    // });



})