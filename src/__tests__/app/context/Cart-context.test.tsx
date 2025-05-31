// import { renderHook, act } from '@testing-library/react-hooks';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/app/context/Cart-context';
import { Product } from '@/types/interfaces';


// Mock localStorage
const store: Record<string, string> = {};
beforeEach(() => {
    // const store: Record<string, string> = {};

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string): string | null => store[key] || null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string): void => {
    store[key] = value;
    });
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key: string): void => {
    delete store[key];
});
});

afterEach(() => {
  jest.clearAllMocks();
});

const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'A product',
  category: {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg",
    creationAt: "2025-05-29T20:37:10.000Z",
    updatedAt: "2025-05-29T20:37:10.000Z"
  },
  images: ['/tinky.jpg', '/winky.jpg','/lala.jpg'],
};

describe('CartContext', () => {
  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('increases quantity if product already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('decreases item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
      result.current.decReaseItem(mockProduct);
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('removes item if quantity goes to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.decReaseItem(mockProduct);
    });

    expect(result.current.cart.length).toBe(0);
  });

  it('clears cart on checkout', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.checkout();
    });

    expect(result.current.cart.length).toBe(0);
  });
});
