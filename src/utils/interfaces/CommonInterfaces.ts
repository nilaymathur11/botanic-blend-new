import { Dispatch, SetStateAction } from "react";

export interface CustomSelectProps {
    options: {
        value: string;
        label: string;
    }[];
    value: SetStateAction<string>
    onChange: Dispatch<SetStateAction<string>>;
    label: string;
}

export interface IProduct {
    id?: string;
    name: string;
    price: number;
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