import ProductForm from "@/components/Dashboard/ProductForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { Target } from "lucide-react";

describe('Testing ProductForm', () => {
    const mockProduct = {
        id: 4,
        title: 'Big Boss Jacket',
        price: 100,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {
            id: 2,
            name: 'Clothes',
            image: '/images/clothes.png',
            slug: 'clothes',
            creationAt: '2025-01-01',
            updatedAt: '2025-01-02',
        }
    }; 
    const mockCategory = [{
            id: 1,
            name: 'Electronics',
            image: '/images/electronics.png',
            slug: 'electronics',
            creationAt: '2025-01-01',
            updatedAt: '2025-01-02',
        },
        {
            id: 2,
            name: 'Clothes',
            image: '/images/clothes.png',
            slug: 'clothes',
            creationAt: '2025-01-01',
            updatedAt: '2025-01-02',
        },
    ];
    const mockOnCancel = jest.fn();
    const mockOnSubmit = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render all component with mockProduct', () => {
        render(<ProductForm product={mockProduct} onCancel={mockOnCancel} titleForm='Edit Product' category={mockCategory} onSubmit={mockOnSubmit} />);

        const titleForm = screen.getByText('Edit Product');
        const newImage = screen.getByTestId('newImg');
        const labelNewImage = screen.getByText(/Add New Image url:/i);
        const inptNewImage = screen.getByTestId('inptNewImage');
        const btnAddImage = screen.getByTestId('btnAddImage');
        const labelListImage = screen.getByText(/List Images/i);
        const listImg = screen.getAllByTestId('listImg');
        const labelImgInpt = screen.getAllByText(/Image url:/i);
        const inptImageList = screen.getAllByTestId('inptImageList');
        const btnDeleteImage = screen.getAllByTestId('btnDeleteImage');
        const labelTitle = screen.getByText(/Title:/i);
        const inptTitle = screen.getByTestId('inptTitle');
        const labelPrice = screen.getByText(/Price:/i);
        const inptPrice = screen.getByTestId('inptPrice');
        const labelDescription = screen.getByText(/Description:/i);
        const inptDescription = screen.getByTestId('inptDescription');
        const labelCategory = screen.getByText(/Category:/i);
        const selectCategory = screen.getByTestId('categorySelect');
        const btnCancel = screen.getByTestId('btnCancel');
        const btnSave = screen.getByTestId('btnSave');

        
        expect(titleForm).toBeInTheDocument();
        expect(newImage).toBeInTheDocument;
        expect(labelNewImage).toBeInTheDocument();
        expect(inptNewImage).toHaveValue("");
        expect(btnAddImage).toHaveClass('bg-gray-500 cursor-not-allowed');
        expect(labelListImage).toBeInTheDocument();
        expect(listImg[0]).toHaveAttribute('src', 'b.jpg');
        expect(listImg[1]).toHaveAttribute('src', 'o.jpg');
        expect(listImg[2]).toHaveAttribute('src', 's.jpg');
        expect(labelImgInpt[0]).toBeInTheDocument();
        expect(labelImgInpt[1]).toBeInTheDocument();
        expect(labelImgInpt[2]).toBeInTheDocument();
        expect(inptImageList[0]).toHaveValue('b.jpg');
        expect(inptImageList[1]).toHaveValue('o.jpg');
        expect(inptImageList[2]).toHaveValue('s.jpg');
        expect(btnDeleteImage[0]).toBeInTheDocument();
        expect(btnDeleteImage[1]).toBeInTheDocument();
        expect(btnDeleteImage[2]).toBeInTheDocument();
        expect(labelTitle).toBeInTheDocument();
        expect(inptTitle).toHaveValue('Big Boss Jacket');
        expect(labelPrice).toBeInTheDocument();
        expect(inptPrice).toHaveValue('100');
        expect(labelDescription).toBeInTheDocument();
        expect(inptDescription).toHaveValue('This is Jacket made you like a boss');
        expect(labelCategory).toBeInTheDocument();
        expect(selectCategory).toHaveValue('2');
        expect(screen.getByText('Select Category')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Clothes')).toBeInTheDocument();
        expect(btnCancel).toBeInTheDocument();
        expect(btnSave).toHaveClass('bg-emerald-500 hover:bg-emerald-700 hover:text-white active:scale-95 duration-200');
    });

    test('render all component without mockProduct', () => {
        render(<ProductForm product={undefined} onCancel={mockOnCancel} titleForm='Create Product' category={mockCategory} onSubmit={mockOnSubmit} />);

        const titleForm = screen.getByText('Create Product');
        const newImage = screen.getByTestId('newImg');
        const labelNewImage = screen.getByText(/Add New Image url:/i);
        const inptNewImage = screen.getByTestId('inptNewImage');
        const btnAddImage = screen.getByTestId('btnAddImage');
        const labelListImage = screen.getByText(/List Images/i);
        const labelTitle = screen.getByText(/Title:/i);
        const inptTitle = screen.getByTestId('inptTitle');
        const labelPrice = screen.getByText(/Price:/i);
        const inptPrice = screen.getByTestId('inptPrice');
        const labelDescription = screen.getByText(/Description:/i);
        const inptDescription = screen.getByTestId('inptDescription');
        const labelCategory = screen.getByText(/Category:/i);
        const selectCategory = screen.getByTestId('categorySelect');
        const btnCancel = screen.getByTestId('btnCancel');
        const btnSave = screen.getByTestId('btnSave');

        
        expect(titleForm).toBeInTheDocument();
        expect(newImage).toBeInTheDocument;
        expect(labelNewImage).toBeInTheDocument();
        expect(inptNewImage).toHaveValue("");
        expect(btnAddImage).toHaveClass('bg-gray-500 cursor-not-allowed');
        expect(labelListImage).toBeInTheDocument();
        expect(labelTitle).toBeInTheDocument();
        expect(inptTitle).toHaveValue('');
        expect(labelPrice).toBeInTheDocument();
        expect(inptPrice).toHaveValue('');
        expect(labelDescription).toBeInTheDocument();
        expect(inptDescription).toHaveValue('');
        expect(labelCategory).toBeInTheDocument();
        expect(selectCategory).toHaveValue('0');
        expect(screen.getByText('Select Category')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Clothes')).toBeInTheDocument();
        expect(btnCancel).toBeInTheDocument();
        expect(btnSave).toHaveClass('bg-gray-500 cursor-not-allowed');
    });

    test('test handle change input', () => {
        render(<ProductForm product={mockProduct} onCancel={mockOnCancel} titleForm='Edit Product' category={mockCategory} onSubmit={mockOnSubmit} />);
        // test input new image
        const newImage = screen.getByTestId('newImg');
        const inptNewImage = screen.getByTestId('inptNewImage');
        fireEvent.change(inptNewImage, {target: {value: 'ultrman.jpg'}});
        expect(inptNewImage).toHaveValue('ultrman.jpg');
        expect(newImage).toHaveAttribute('src', 'ultrman.jpg');
        // test input list image
        const listImg = screen.getAllByTestId('listImg');
        const inptImageList = screen.getAllByTestId('inptImageList');
        fireEvent.change(inptImageList[0], {target: {value: 's.jpg'}});
        fireEvent.change(inptImageList[1], {target: {value: 'b.jpg'}});
        fireEvent.change(inptImageList[2], {target: {value: 'o.jpg'}});
        expect(listImg[0]).toHaveAttribute('src', 's.jpg');
        expect(listImg[1]).toHaveAttribute('src', 'b.jpg');
        expect(listImg[2]).toHaveAttribute('src', 'o.jpg');
        expect(inptImageList[0]).toHaveValue('s.jpg');
        expect(inptImageList[1]).toHaveValue('b.jpg');
        expect(inptImageList[2]).toHaveValue('o.jpg');
        // test input title product
        const inptTitle = screen.getByTestId('inptTitle');
        fireEvent.change(inptTitle, {target: {value: 'ultramilk'}});
        expect(inptTitle).toHaveValue('ultramilk');
        // test input price product
        const inptPrice = screen.getByTestId('inptPrice');
        fireEvent.change(inptPrice, {target: {value: '2000'}});
        expect(inptPrice).toHaveValue('2000');
        // test input description product
        const inptDescription = screen.getByTestId('inptDescription');
        fireEvent.change(inptDescription, {target: {value: 'This is Ultramilk colabs with ultrman'}});
        expect(inptDescription).toHaveValue('This is Ultramilk colabs with ultrman');
        // test select category product
        const selectCategory = screen.getByTestId('categorySelect');
        fireEvent.change(selectCategory, {target: {value: 1}});
        expect(selectCategory).toHaveValue('1');
    });

    test('test add new image', () => {
        render(<ProductForm product={mockProduct} onCancel={mockOnCancel} titleForm='Edit Product' category={mockCategory} onSubmit={mockOnSubmit} />);

        const inptNewImage = screen.getByTestId('inptNewImage');
        const btnAddImage = screen.getByTestId('btnAddImage');
        fireEvent.change(inptNewImage, {target: {value: 'ultraman.jpg'}});
        fireEvent.click(btnAddImage);
        const listImg = screen.getAllByTestId('listImg');
        const inptImageList = screen.getAllByTestId('inptImageList');

        expect(listImg[0]).toHaveAttribute('src', 'b.jpg');
        expect(listImg[1]).toHaveAttribute('src', 'o.jpg');
        expect(listImg[2]).toHaveAttribute('src', 's.jpg');
        expect(listImg[3]).toHaveAttribute('src', 'ultraman.jpg');
        expect(inptImageList[0]).toHaveValue('b.jpg');
        expect(inptImageList[1]).toHaveValue('o.jpg');
        expect(inptImageList[2]).toHaveValue('s.jpg');
        expect(inptImageList[3]).toHaveValue('ultraman.jpg');
    });
    test('test add new image', () => {
        render(<ProductForm product={mockProduct} onCancel={mockOnCancel} titleForm='Edit Product' category={mockCategory} onSubmit={mockOnSubmit} />);

        const listImg = screen.getAllByTestId('listImg');
        const inptImageList = screen.getAllByTestId('inptImageList');
        const btnDeleteImage = screen.getAllByTestId('btnDeleteImage');
        expect(listImg[0]).toHaveAttribute('src', 'b.jpg');
        expect(listImg[1]).toHaveAttribute('src', 'o.jpg');
        expect(listImg[2]).toHaveAttribute('src', 's.jpg');
        expect(inptImageList[0]).toHaveValue('b.jpg');
        expect(inptImageList[1]).toHaveValue('o.jpg');
        expect(listImg[2]).toHaveAttribute('src', 's.jpg');
        // delete second image
        fireEvent.click(btnDeleteImage[1]);
        expect(listImg[0]).toHaveAttribute('src', 'b.jpg');
        expect(listImg[1]).toHaveAttribute('src', 's.jpg');
        expect(inptImageList[0]).toHaveValue('b.jpg');
        expect(listImg[1]).toHaveAttribute('src', 's.jpg');
    });

    test('test submit', () => {
        render(<ProductForm product={mockProduct} onCancel={mockOnCancel} titleForm='Edit Product' category={mockCategory} onSubmit={mockOnSubmit} />);

        const btnSave = screen.getByTestId('btnSave');
        fireEvent.click(btnSave);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    });
})
