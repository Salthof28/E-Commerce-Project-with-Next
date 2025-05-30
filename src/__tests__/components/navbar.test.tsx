import { render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/Cart-context';

jest.mock('next-auth/react');
jest.mock('@/app/context/Cart-context');

describe('Navbar Component', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    (useCart as jest.Mock).mockReturnValue({
      totalQuantity: () => 0,
    });
  });

  it('renders Navbar elements', () => {
    render(<Navbar />);

    // Check logo image
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check profile picture
    expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();

    // Check menu links
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/item list/i)).toBeInTheDocument();

    // Check cart icon
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/CheckOut');
  });
});
