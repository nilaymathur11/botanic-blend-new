import React from 'react'
import Image from 'next/image'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProductsTableProps } from '@/utils/interfaces/CommonInterfaces'

export function ProductsTable({ products, setEditingProduct, handleDeleteProduct }: ProductsTableProps) {
    return (
        <div className="w-full overflow-auto capitalize">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Uses</TableHead>
                        <TableHead>Ingredients</TableHead>
                        <TableHead>Is Trending</TableHead>
                        <TableHead>Is New</TableHead>
                        <TableHead>Steps to Use</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.length ? (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                        {product.images && product.images.length > 0 && (
                                            <Image
                                                width={84}
                                                height={84}
                                                alt={product.name}
                                                src={product.images[0]}
                                                className="mr-2 rounded object-cover"
                                            />
                                        )}
                                        <span>{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.description.substring(0, 50)}...</TableCell>
                                <TableCell>{product.uses?.join(', ')}</TableCell>
                                <TableCell>{product.ingredients?.join(', ')}</TableCell>
                                <TableCell>{product.is_trending ? "True" : "False"}</TableCell>
                                <TableCell>{product.is_new ? "True" : "False"}</TableCell>
                                <TableCell>{product.steps_to_use?.join(', ')}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditingProduct(product)}
                                        >
                                            <Edit className="h-4 w-4 text-greeen-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="h-24 text-center">
                                No products found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}