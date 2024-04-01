import {  Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Pi } from 'lucide-react';
import { Trash } from 'lucide-react';
import { removeItem } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const CartItem = ({item, setQty}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleRemoveCartItem = (item) => {
    confirm("Apakah anda yakin ingin menghapus item ini?") && dispatch(removeItem(item));
  }

  const increment = () => {
    setQuantity(quantity + 1);
    setQty(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQty(quantity - 1);
    }
  };

  return (
    <div className="mb-2">
      <div className="flex gap-2 px-2 py-4 h-[30vh] bg-white/10 rounded-md">
        <div className="w-5/12 flex gap-3 mr-4">
          <Button onClick={()=>handleRemoveCartItem(item)} variant="ghost">
            <Trash className="text-red-500 w-4 h-4" />
          </Button>
          <img
            className="w-[50px] h-[50px] aspect-square rounded-md object-cover"
            src={item.imageUrl}
            alt={item.name}
          />
        </div>
        <div className="w-7/12 flex flex-col justify-between items-center">
          <p className="text-xs">{item.name}</p>
          <div className="flex gap-3 text-xs">
            <p className="font-semibold flex bg-primary px-2 py-1 rounded-md">
              {item.price * quantity} <Pi className="ml-2" size={16} />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center border-[1px] border-foreground rounded-lg">
              <Button
                onClick={decrement}
                className="hover:bg-transparent"
                variant="ghost">
                <Minus className="w-4 h-4" />
              </Button>
              <p className="px-2">{quantity}</p>
              <Button
                onClick={increment}
                className="hover:bg-transparent"
                variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
