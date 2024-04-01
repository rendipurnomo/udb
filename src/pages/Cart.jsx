import {  ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/ProductList';
import CartItem from '@/components/CartItem';
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import empty from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetItem } from '../features/cart/cartSlice';
import { Pi } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = ({orderProduct}) => {
  const [quantity, setQty] = useState(1);

  const { authUser } = useAuthContext();

  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const handleResetCart = () => {
    confirm("Apakah anda yakin ingin menghapus semua item?") && dispatch(resetItem());
  }


  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * quantity, 0
  );
  
  const paymentData = {item:cartItems.map((item) => item.name).join(", "), quantity: quantity, username: authUser.username, address: authUser.address}
  const memo = authUser.fullName + " " + "Order #" + cartItems.map((item) => item.name).join(",") + " - " + "quantity: " + quantity;
  if (cartItems.length === 0) {
    return (
      <div className="py-4">
        <div className="h-[500px] flex flex-col justify-center items-center">
          <img className="w-36 " src={empty} alt="empty cart" />
          <h1 className="font-semibold text-lg">Keranjang Belanjamu kosong</h1>
          <p className="text-center text-sm">Lanjutkan belanja</p>
        </div>
        <ProductList title="Rekomendasi produk" />
      </div>
    );
  }

  const handleOrder = async(e) => {
    e.preventDefault();
    if (authUser.roles === 'member') {
      toast.error('Anda Belum Menjadi Member Istimewa, Silahkan Mendaftar Terlebih Dahulu') 
      return
    }
    orderProduct(memo, totalAmount, {paymentData});
  }

  return (
    <section>
      <nav className="flex justify-between items-center py-4 border-b">
        <Link to="/" className="flex items-center gap-4">
          <ArrowLeft className="cursor-pointer" />
          <h2 className="font-semibold">Cart</h2>
        </Link>
        <div className="flex items-center gap-4">
        </div>
      </nav>

      <div className="flex justify-between items-center px-4 py-2 border-b">
        {cartItems.length > 0 && <p>{cartItems.length} produk dipilih</p>}
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            setQty={setQty}
          />
        ))}
      <div className="py-4 mb-20">
        <ProductList title="Rekomendasi produk" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t z-50 bg-background text-xs">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>handleResetCart()}>
              <Trash className="text-red-500" />
            </Button>
            <p>Semua</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col justify-between items-end">
              <p>Total</p>
              <p className='flex items-center'>{totalAmount} <Pi className="ml-2" size={16} /></p>
            </div>
            <Button
              onClick={handleOrder}
              className="min-w-[90px]">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
