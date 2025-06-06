import Profile from "@/app/profile/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { signOut } from "next-auth/react";

const mockPush = jest.fn();
jest.mock('@/hooks/useAuthCustomer', () => () => ({
    router: {
        push: mockPush,
        refresh: jest.fn(),
    },
    session: {
        user: {
        name: 'John',
        email: 'john@mail.com',
        avatar: 'johndoe.jpg',
        password: '1234'
        }
    },
}));

jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar
});
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        refresh: jest.fn(),
    })),
}));

describe('Testing Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();

    });

    test('Render All Component', () => {
        render(<Profile />);

           
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', 'johndoe.jpg');

        expect(screen.getByText(/Welcome John/i)).toBeInTheDocument();
        expect(screen.getByText(/Profile Information/i)).toBeInTheDocument();
        expect(screen.getByTestId('userName')).toHaveTextContent('John')
        expect(screen.getByText('john@mail.com')).toBeInTheDocument();
        expect(screen.getByText(/Change Profile/i)).toBeInTheDocument();
        expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
        expect(screen.getByText(/History What You Buy/i)).toBeInTheDocument();
        expect(screen.getByText(/You don't buy Anything/i)).toBeInTheDocument();
    });

    test("should call router.push('/profile/edit') when 'Change Profile' is clicked", () => {
        
        jest.mock('@/hooks/useAuthCustomer', () => () => ({
        router: { push: mockPush, refresh: jest.fn() },
        session: {
            user: {
            name: 'John',
            email: 'john@mail.com',
            avatar: 'johndoe.jpg',
            }
        }
        }));

        render(<Profile />);
        const btn = screen.getByText(/Change Profile/i);
        fireEvent.click(btn);
        expect(mockPush).toHaveBeenCalledWith("/profile/edit");
    });

    test("should call signOut with correct callback", () => {
        render(<Profile />);
        const btn = screen.getByText(/Sign Out/i);
        fireEvent.click(btn);
        expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
    });

})