import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/Cart-context';
import { Users } from '@/types/interfaces';
import { act } from 'react';
jest.mock('next-auth/react');
jest.mock('@/app/context/Cart-context');

describe('Navbar Component', () => {
  const mockUserSession: Users = {
    id: 2,
    email: 'dude@Mail.com',
    password: 'dudewadude',
    name: 'Super Dude',
    role: 'Customer',
    avatar: 'images/dude.png',
  }
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    (useCart as jest.Mock).mockReturnValue({
      totalQuantity: () => 0,
    });

  });

  test('renders Navbar elements', () => {
    render(<Navbar />);

    // Check logo image
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check profile picture
    expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();

    // Check menu links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();

    // Check cart icon
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/CheckOut');
    
  });

  test('check img when status unauthenticated', () => {
    render(<Navbar />);
 
    const imageUser = screen.getByAltText('Profile Picture');
    const nameUser = screen.getByText('Guest');
    expect(imageUser).toHaveAttribute('src', '/no-img-profile.png');
    expect(nameUser).toBeInTheDocument(); 
  });

  test('check icon user as status authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: mockUserSession,
        accessToken: 'token-123'
      },
      status: 'authenticated',
    });
    render(<Navbar />);
    const imageUser = screen.getByAltText('Profile Picture');
    const nameUser = screen.getByText(mockUserSession.name);
    expect(imageUser).toHaveAttribute('src', mockUserSession.avatar);
    expect(nameUser).toBeInTheDocument(); 
  });

  test('test notification on cart no spawn as quantity is 0', () => {
    render(<Navbar />);
    const notifCart = screen.queryByText('0');
    expect(notifCart).not.toBeInTheDocument();
  });
  
  test('test notification on cart spawn as quantity is 3', () => {
    (useCart as jest.Mock).mockReturnValue({
      totalQuantity: () => 3
    })
    render(<Navbar />);
    const notifCart = screen.queryByText('3');
    expect(notifCart).toBeInTheDocument();
  })

  test('test notification on cart spawn as quantity is 12', () => {
    (useCart as jest.Mock).mockReturnValue({
      totalQuantity: () => 12
    })
    render(<Navbar />);
    const notifCart = screen.queryByText('9+');
    expect(notifCart).toBeInTheDocument();
  })

  test('test href address in link navbar', () => {
    render(<Navbar />);

    const linkHome = screen.getByText(/Home/i).closest('a');
    expect(linkHome).toHaveAttribute('href', '/');
  })

  test('test hidden navbar as scroll down website', () => {
    render(<Navbar />);

    const navbar = screen.getByTestId('navbarTest');
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(navbar).toHaveClass('-translate-y-full');
  });

  test('test show navbar as scroll up website', () => {
    render(<Navbar />);

    const navbar = screen.getByTestId('navbarTest');
    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(navbar.className).toMatch(/translate-y-0/);
  });
  
  test('test hamburger navbar button', () => {
    render(<Navbar />);

    const btnHamburger = screen.getByTestId('btnHamburger');
    const nav = screen.getByTestId('hamburgerNav');
    expect(nav).toHaveClass('hidden');
    
    fireEvent.click(btnHamburger);
    expect(nav).toHaveClass('flex');
  });
});
