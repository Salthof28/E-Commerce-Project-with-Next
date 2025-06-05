import Register from "@/app/register/page";
import { fetchUsers } from "@/services/api";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock('@/hooks/useAuthCustomer', () => () => ({
    router: {
        push: jest.fn(),
        refresh: jest.fn(),
    },
    session: null,
}));

jest.mock('@/services/api', () => ({
    fetchUsers: jest.fn(),
}));

jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Mocked Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar
});

describe('Testing Register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('render all component', () => {
        render(<Register />);

        expect(screen.getByText('Register Page')).toBeInTheDocument();
        expect(screen.getByTestId('inptName')).toHaveValue('');
        expect(screen.getByTestId('inptEmail')).toHaveValue('');
        expect(screen.getByTestId('inptPassword')).toHaveValue('');
        expect(screen.getByTestId('btnRegister')).toBeInTheDocument();
    });

    test('show error if any input is missing', async () => {
        render(<Register />);

        fireEvent.click(screen.getByTestId('btnRegister'));

        await waitFor(() => {
            expect(screen.getByText(/Please fill all data/i)).toBeInTheDocument();
        });
    });

    test('show error if email already registered', async () => {
        (fetchUsers as jest.Mock).mockResolvedValue([
            { email: 'user@test.com' }
        ]);

        render(<Register />);

        fireEvent.change(screen.getByTestId('inptName'), { target: { value: 'User' } });
        fireEvent.change(screen.getByTestId('inptEmail'), { target: { value: 'user@test.com' } });
        fireEvent.change(screen.getByTestId('inptPassword'), { target: { value: '123456' } });

        fireEvent.click(screen.getByTestId('btnRegister'));

        await waitFor(() => {
            expect(screen.getByText(/email already registered/i)).toBeInTheDocument();
        });
    });

    test('register user successfully', async () => {
        (fetchUsers as jest.Mock).mockResolvedValue([]);

        global.fetch = jest.fn().mockResolvedValue({ ok: true });

        render(<Register />);

        fireEvent.change(screen.getByTestId('inptName'), { target: { value: 'New User' } });
        fireEvent.change(screen.getByTestId('inptEmail'), { target: { value: 'new@mail.com' } });
        fireEvent.change(screen.getByTestId('inptPassword'), { target: { value: '123456' } });

        fireEvent.click(screen.getByTestId('btnRegister'));

        await waitFor(() => {
            expect(screen.getByText(/User Created/i)).toBeInTheDocument();
        });
    });

    test('show error when registration fails', async () => {
        (fetchUsers as jest.Mock).mockResolvedValue([]);
        global.fetch = jest.fn().mockResolvedValue({ ok: false });

        render(<Register />);

        fireEvent.change(screen.getByTestId('inptName'), { target: { value: 'User' } });
        fireEvent.change(screen.getByTestId('inptEmail'), { target: { value: 'fail@mail.com' } });
        fireEvent.change(screen.getByTestId('inptPassword'), { target: { value: '123456' } });

        fireEvent.click(screen.getByTestId('btnRegister'));

        await waitFor(() => {
            expect(screen.getByText(/User Failed to create/i)).toBeInTheDocument();
        });
    });

})