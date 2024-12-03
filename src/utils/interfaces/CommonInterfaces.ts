export interface IProduct {
    id?: string;
    name: string;
    price: number;
    original_price: number;
    stock: number;
    images: string[];
    is_new: boolean;
    is_trending: boolean;
    video: string | null | File;
    category: string;
    description: string;
    uses: string[];
    ingredients: string[];
    steps_to_use: string[];
}

export interface NewProductFormProps {
    onSubmit: (product: IProduct) => Promise<void>
    onCancel: () => void
    initialData: IProduct | null
}

export interface ProductsTableProps {
    products: IProduct[]
    setEditingProduct: (product: IProduct) => void
    handleDeleteProduct: (id?: string) => void
}

export interface ProductState {
    items: IProduct[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export interface ProductCardProps {
    product: IProduct
    type: 'buy' | 'edit' | 'view'
}

export interface CartProps {
    isOpen: boolean
    onClose: () => void
}