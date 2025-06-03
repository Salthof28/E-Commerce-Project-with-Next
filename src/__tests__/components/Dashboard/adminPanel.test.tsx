import AdminPanel from "@/components/Dashboard/adminPanel";
import { fireEvent, render, screen } from "@testing-library/react";
import { signOut } from "next-auth/react";
jest.mock('next-auth/react', () => ({
    ...jest.requireActual('next-auth/react'),
    signOut: jest.fn(), // mock signOut
}));

describe('Test adminPanel', () => {
  const mockSession = {
        user: {
            name: "tinky",
            email: "tinky@mail.com",
            image: "/img.jpg",
        },
        expires: "2025-12-31T23:59:59.999Z",
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('render all component when mockIsOpen true', () => {
        render(<AdminPanel session={mockSession} />);

        const textAdminPanel = screen.getByText(/Admin Panel/i);
        const dashboardNav = screen.getByText(/Dashboard/i).closest('a');
        const productsNav = screen.getByText(/Products/i).closest('a');
        const UsersNav = screen.getByText(/Users/i).closest('a');
        const initialLetter = screen.getByText(/T/);
        const nameUser = screen.getByText(mockSession.user.name);
        const emailUser = screen.getByText(mockSession.user.email);
        const btnSignOut = screen.getByText(/Sign Out/i);

        expect(textAdminPanel).toBeInTheDocument();
        expect(dashboardNav).toHaveAttribute('href', '/dashboard');
        expect(productsNav).toHaveAttribute('href', '/dashboard/products');
        expect(UsersNav).toHaveAttribute('href', '/dashboard/users');
        expect(initialLetter).toBeInTheDocument();
        expect(nameUser).toBeInTheDocument();
        expect(emailUser).toBeInTheDocument();
        expect(btnSignOut).toBeInTheDocument();
    });

    test('test hamburger button form mobile version', () => {
        render(<AdminPanel session={mockSession} />);

        const btnHamburger = screen.getByTestId('hamButton');
        const panel = screen.getByTestId('navPanel');
        const btnClosePanel = screen.getByTestId('closePanel');
        expect(btnHamburger).toBeInTheDocument();
        expect(panel).toHaveClass('-translate-x-full');

        fireEvent.click(btnHamburger);
        expect(btnHamburger).not.toBeInTheDocument();
        expect(panel).toHaveClass('translate-x-0');
        expect(btnClosePanel).toBeInTheDocument();

        fireEvent.click(btnClosePanel);
        expect(panel).toHaveClass('-translate-x-full');
    });

    test('test click signOut', () => {
        render(<AdminPanel session={mockSession} />);

        const btnSignOut = screen.getByText(/Sign Out/i);

        fireEvent.click(btnSignOut);

        expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
    });

})