import NavigationAdmin from "@/components/Dashboard/navigation";
import { render, screen } from "@testing-library/react";

describe('Testing NavigationAdmin', () => {
    const mockSession = {
        user: {
            name: "tinky",
            email: "tinky@mail.com",
            avatar: "/img.jpg",
        },
        expires: "2025-12-31T23:59:59.999Z",
    };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('testing render component', () => {
        render(<NavigationAdmin session={mockSession} />);

        const logoWeb = screen.getByTestId('imgDeShopper'); 
        const avatarUser = screen.getByTestId('userAvatar');
        const username = screen.getByText('tinky');

        expect(logoWeb).toHaveAttribute('src', '/deShoper.png');
        expect(avatarUser).toHaveAttribute('src', '/img.jpg');
        expect(username).toBeInTheDocument();
        
    });
})