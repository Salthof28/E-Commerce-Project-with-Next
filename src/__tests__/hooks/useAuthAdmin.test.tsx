import useAuthAdmin from "@/hooks/useAuthAdmin";
import { renderHook } from "@testing-library/react";
import { useSession } from "next-auth/react";
import * as nextNavigation from "next/navigation";
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
        const mockedUseRouter = nextNavigation.useRouter as jest.Mock;
        mockedUseRouter.mockReturnValue({ push: pushMock });
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
    });

    test('redirect to /login when unauthenticated', () => {
        renderHook(() => useAuthAdmin());
        expect(pushMock).toHaveBeenCalledWith('/login');
    });

    test('redirect to /login when unauthenticated', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    id: 2,
                    email: 'dude@Mail.com',
                    password: 'dudewadude',
                    name: 'Super Dude',
                    role: 'customer',
                    avatar: 'images/dude.png',
                },
                accessToken: 'tokek-123'
            },
            status: 'authenticated',
        });

        renderHook(() => useAuthAdmin());
        expect(pushMock).toHaveBeenCalledWith('/profile');
    });
});