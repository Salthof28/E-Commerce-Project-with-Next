import { fetchDataSingProd, fetchDataProd, fetchFilterCatProd, fetchDataCat, fetchDataProdPag, fetchUsers, CountLengDataProd, CountLengDataUsers } from "@/services/api";

global.fetch = jest.fn();
const singMockProduct = {
        id: 4,
        title: 'Big Boss Jacket',
        price: 100,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {id: 1, name: 'Clothes',}
};

const mockProducts = [{
        id: 4,
        title: 'Big Boss Jacket',
        price: 100,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {id: 1, name: 'Clothes',}
    },
    {
        id: 5,
        title: 'Big Boss Jacket Tralala',
        price: 400,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {id: 1, name: 'Clothes',}
    },
    {
        id: 6,
        title: 'Big Boss Jacket Trilili',
        price: 120,
        description: 'This is Jacket made you like a boss',
        images: ['b.jpg', 'o.jpg', 's.jpg'],
        category: {id: 1, name: 'Clothes',}
    }
];

const mockUsers = [{
        id: 1,
        email: 'tinky@Mail.com',
        password: 'tinky123',
        name: 'Tinky Winky'
    },
    {
        id: 2,
        email: 'winky@Mail.com',
        password: 'winky123',
        name: 'Winky Dipsi'
    }
]

describe('testing fetchDataSingProd', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch single product by id', async () => {

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(singMockProduct)
        });

        const result = await fetchDataSingProd('4'); // run function fetch from api.ts
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products/4'); // expectation, fetch callback address api
        expect(result).toEqual(singMockProduct); // expectation result is mockProduct
    })
});


describe('testing fetchDataProd', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch all product', async () => {

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await fetchDataProd();
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
        expect(result).toEqual(mockProducts);
    })
});

describe('testing fetchFilterCatProd', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch filter product', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await fetchFilterCatProd('clothes');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products/?categorySlug=clothes');
        expect(result).toEqual(mockProducts);
    })
});

describe('testing fetchDataCat', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch category', async () => {
        const mockCategory = [{
                id: 1,
                name: 'Electronics',
            },
            {
                id: 2,
                name: 'Clothes',
            },
        ];
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockCategory)
        });

        const result = await fetchDataCat();
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/categories');
        expect(result).toEqual(mockCategory);
    })
});

describe('testing fetchDataProdPag', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch product without search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await fetchDataProdPag(0, 10, '');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products?offset=0&limit=10');
        expect(result).toEqual(mockProducts);
    });
    test('fetch product with search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await fetchDataProdPag(0, 10, 'big');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products?offset=0&limit=10&title=big');
        expect(result).toEqual(mockProducts);
    })
});

describe('testing fetchUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('fetch All users', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUsers)
        });

        const result = await fetchUsers();
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users');
        expect(result).toEqual(mockUsers);
    });

});

describe('testing CountLengDataProd', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('count data product without search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await CountLengDataProd('');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
        expect(result).toEqual(3);
    });
    test('count data product with search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await CountLengDataProd('big');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products?title=big');
        expect(result).toEqual(3);
    });
});

describe('testing CountLengDataUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('count data users without search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUsers)
        });

        const result = await CountLengDataUsers('');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users');
        expect(result).toEqual(2);
    });
    test('count data users with search', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUsers)
        });

        const result = await CountLengDataUsers('tinky');
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users?title=tinky');
        expect(result).toEqual(2);
    });
});