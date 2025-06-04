import UsersForm from "@/components/Dashboard/UsersForm";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Test UsersForm component', () => {
    const mockUser = {
        id: 1,
        name: 'Tinky Winky',
        email: 'tinky@Mail.com',
        password: 'tinky123',
        role: 'customer',
        avatar: 'tinky.jpg',
    }
    
    const mockOnCancel = jest.fn();
    const mockOnSubmit = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component with mockUser', () => {
        render(<UsersForm user={mockUser} onCancel={mockOnCancel} titleForm="Edit User" onSubmit={mockOnSubmit} isEdit={true} />);

        const titleForm = screen.getByText(/Edit User/i);
        const imageUser = screen.getByRole('img');
        const labelImage = screen.getByText(/Image url:/i);
        const inptImage = screen.getByTestId('inptAvatar');
        const labelName = screen.getByText(/Name:/i);
        const inptName = screen.getByTestId('inptName');
        const labelEmail = screen.getByText(/Email:/i);
        const inptEmail = screen.getByTestId('inptEmail');
        const labelRole = screen.getByText(/Role:/i);
        const selectRole = screen.getByTestId('selectRole');
        const btnCancel = screen.getByTestId('btnCancel');
        const btnSave = screen.getByTestId('btnSave');

        expect(titleForm).toBeInTheDocument();
        expect(labelImage).toBeInTheDocument();
        expect(labelName).toBeInTheDocument();
        expect(labelEmail).toBeInTheDocument();
        expect(labelRole).toBeInTheDocument();
        expect(imageUser).toHaveAttribute('src' ,'tinky.jpg');
        expect(inptImage).toHaveValue('tinky.jpg');
        expect(inptName).toHaveValue('Tinky Winky');
        expect(inptEmail).toHaveValue('tinky@Mail.com');
        expect(selectRole).toHaveValue('customer');
        expect(btnCancel).toBeInTheDocument();
        expect(btnSave).toHaveClass('bg-emerald-500 hover:bg-emerald-700 hover:text-white active:scale-95 duration-200');
    });

    test('Render input Password when user undefined', () => {
        render(<UsersForm user={undefined} onCancel={mockOnCancel} titleForm="Create User" onSubmit={mockOnSubmit} isEdit={false} />);
        
        const inptPassword = screen.getByTestId('inptPassword');
        const btnSave = screen.getByTestId('btnSave');
        expect(btnSave).toHaveClass('bg-gray-500 cursor-not-allowed');
        expect(inptPassword).toHaveValue('');

        fireEvent.change(inptPassword, {target: {value: 'lala123'}});
        expect(inptPassword).toHaveValue('lala123');
    });

    test('test onchange input', () => {
        render(<UsersForm user={mockUser} onCancel={mockOnCancel} titleForm="Edit User" onSubmit={mockOnSubmit} isEdit={true} />);
        // change avatar
        const imageUser = screen.getByRole('img');
        const inptImage = screen.getByTestId('inptAvatar');
        fireEvent.change(inptImage, {target: {value: 'lala.jpg'}});
        expect(imageUser).toHaveAttribute('src' ,'lala.jpg');
        expect(inptImage).toHaveValue('lala.jpg');
        // change input name
        const inptName = screen.getByTestId('inptName');
        fireEvent.change(inptName, {target: {value: 'Lala'}});
        expect(inptName).toHaveValue('Lala');
        // change input email
        const inptEmail = screen.getByTestId('inptEmail');
        fireEvent.change(inptEmail, {target: {value: 'lala@mail.com'}});
        expect(inptEmail).toHaveValue('lala@mail.com');
        // change select role
        const selectRole = screen.getByTestId('selectRole');
        fireEvent.change(selectRole, {target: {value: 'admin'}});
        expect(selectRole).toHaveValue('admin');
    });

    test('Test Submit', () => {
        render(<UsersForm user={mockUser} onCancel={mockOnCancel} titleForm="Edit User" onSubmit={mockOnSubmit} isEdit={true} />);

        const btnSave = screen.getByTestId('btnSave');
        fireEvent.click(btnSave);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
    
})
