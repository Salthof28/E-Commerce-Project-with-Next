import useAuthCustomer from "@/hooks/useAuthCustomer";
import { renderHook } from "@testing-library/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
jest.mock('next-auth/react', () => ({
    useSession: jest.fn()
}));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

describe('testing hook useAuthAdmin', () => {

    const pushMock = jest.fn(); 

    beforeEach(() => {
        jest.clearAllMocks();
        const mockedUseRouter = useRouter as jest.Mock;
        mockedUseRouter.mockReturnValue({ push: pushMock });
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
    });

    test('redirect to /login when unauthenticated', () => {
        renderHook(() => useAuthCustomer());
        expect(pushMock).toHaveBeenCalledWith('/login');
    });

    test('redirect to /dashboard when authenticated and role admin', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    id: 2,
                    email: 'dude@Mail.com',
                    password: 'dudewadude',
                    name: 'Super Dude',
                    role: 'admin',
                    avatar: 'images/dude.png',
                },
                accessToken: 'tokek-123'
            },
            status: 'authenticated',
        });

        renderHook(() => useAuthCustomer());
        expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
});