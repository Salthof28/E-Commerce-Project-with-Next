import Dashboard from "@/app/dashboard/page";
import { fetchDataProd, fetchDataCat } from "@/services/api";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock('@/components/Dashboard/navigation', () => {
  const MockNavigationAdmin = () => <div data-testid="navigation">Mocked Navigation Admin</div>;
  MockNavigationAdmin.displayName = 'MockNavigationAdmin';
  return MockNavigationAdmin
});

const mockPush = jest.fn();
jest.mock('@/hooks/useAuthAdmin', () => () => ({
    router: {
        push: mockPush,
        refresh: jest.fn(),
    },
    session: {
        user: {
        name: 'John',
        email: 'john@mail.com',
        avatar: 'johndoe.jpg',
        role: 'admin',
        password: '1234'
        }
    },
}));

jest.mock('@/components/Dashboard/adminPanel', () => {
  const MockAdminPanel = () => <div data-testid="adminPanel">Mocked Navigation Admin</div>;
  MockAdminPanel.displayName = 'MockAdminPanel';
  return MockAdminPanel
});

jest.mock('@/services/api', () => ({
    fetchDataProd: jest.fn(),
    fetchDataCat: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));
describe('Testing Dashboard', () => {
    const mockProducts = [{
            id: 4,
            title: 'Jacket Dude',
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
    });

    test('Render all component', () => {
        render(<Dashboard />);

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Products/i)).toBeInTheDocument();
        expect(screen.getByText(/Loading..../i)).toBeInTheDocument();
    });

    test("renders and displays product category stats", async () => {
        // Set up return value dari mock API
        (fetchDataProd as jest.Mock).mockResolvedValue(mockProducts);
        (fetchDataCat as jest.Mock).mockResolvedValue(mockCategory);

        render(<Dashboard />);


        await waitFor(() => {
            expect(screen.getByText("Clothes")).toBeInTheDocument();
        });

        expect(screen.getByText("3 Product")).toBeInTheDocument();

        const progressBars = screen.getAllByTestId("progressbar");
        expect(progressBars.length).toBeGreaterThanOrEqual(1);
    });
})