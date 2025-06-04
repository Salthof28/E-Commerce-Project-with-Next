import useAuthAdmin from "@/hooks/useAuthAdmin";
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
        // setting mock useRouter to return object function push
        const mockedUseRouter = useRouter as jest.Mock;
        mockedUseRouter.mockReturnValue({ push: pushMock });
        // for status session unauthenticated
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
    });

    test('redirect to /login when unauthenticated', () => {
        renderHook(() => useAuthAdmin()); // simulation running hook
        expect(pushMock).toHaveBeenCalledWith('/login');
    });

    test('redirect to /profile when authenticated and role customer', () => {
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