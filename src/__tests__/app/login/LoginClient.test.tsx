import LoginClient from "@/app/login/LoginClient";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        refresh: jest.fn(),
    })),
    useSearchParams: jest.fn()
}));
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signIn: jest.fn(),
}));
jest.mock('@/hooks/useAuthCustomer', () => () => ({
    router: {
        push: jest.fn(),
        refresh: jest.fn(),
    },
    session: null,
}));
jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar
});
describe('Testing LoginClient', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('error=SessionRequired&redirect=/login'));
    });
    
    test('Testing render all component', () => {
        render(<LoginClient initialLoading={false} />);
        
        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
        expect(screen.getByTestId('inptEmail')).toHaveValue('');
        expect(screen.getByTestId('inptPassword')).toHaveValue('');
        expect(screen.getByTestId('btnSignIn')).toBeInTheDocument();
        expect(screen.getByTestId('btnCreate')).toBeInTheDocument();

    });

    test('show "Invalid email or password" when errorType is CredentialsSignin', async () => {
        // mock query: ?error=CredentialsSignin
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('error=CredentialsSignin'));

        render(<LoginClient initialLoading={true} />);
        
        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
        });
    });

    test('should show "You need to be signed in to access this page" when errorType is SessionRequired', () => {
        (useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams('error=SessionRequired')
        );

        render(<LoginClient initialLoading={true} />);
        expect(screen.getByText(/You need to be signed in to access this page/i)).toBeInTheDocument();
    });

    test('should show "An authentication error occurred" when errorType is unknown', () => {
        (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams('error=SomethingElse')
        );

        render(<LoginClient initialLoading={true} />);
        expect(
        screen.getByText(/An authentication error occurred/i)
        ).toBeInTheDocument();
    });

    test('should show error when login fails', async () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

        render(<LoginClient initialLoading={false} />);

        // Isi input
        fireEvent.change(screen.getByTestId('inptEmail'), { target: { value: 'test@mail.com' } });
        fireEvent.change(screen.getByTestId('inptPassword'), { target: { value: 'wrongpass' } });

        // Klik tombol login
        fireEvent.click(screen.getByTestId('btnSignIn'));

        // Tunggu error muncul
        await waitFor(() => {
            expect(screen.getByText(/Invalid Email or Password/i)).toBeInTheDocument();
        });
    });
})