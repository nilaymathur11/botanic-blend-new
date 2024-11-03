import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image';

interface CartItemProps {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartItem({ item, handleQuantityChange, handleRemoveItem }: { item: CartItemProps, handleQuantityChange: (id: number, newQuantity: number) => void, handleRemoveItem: (id: number) => void }) {
  return (
    <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <Image unoptimized={true} width={0} height={0} src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
      <div className="flex-1 space-y-2">
        <div className="text-lg font-semibold text-[#4d7c0f]">{item.name}</div>
        <p className="text-[#666666]">${item.price.toFixed(2)}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.id, -1)}
            className="p-1 text-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-[#666666]">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.id, 1)}
            className="p-1 text-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="p-2 text-[#666666] hover:text-[#4d7c0f] transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}