import React from 'react';
import ProductList from '../components/ProductList';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import emptyWishlist from '../assets/shopping-cart.png';
import { useSelector } from 'react-redux';
import { Button } from '../components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import { Trash } from 'lucide-react';
import { removeItemFromWishlist } from '../features/wishlist/wishlistSlice';
import { addItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react';

const WishList = () => {
  const wishlist = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const addCart = (item) => {
    if(authUser.roles === 'member') {
      toast.error('Anda Belum Menjadi Member Istimewa, Silahkan Mendaftar Terlebih Dahulu');
      return
    }
    toast.success('Item ditambahkan ke keranjang');
    dispatch(addItem(item));
    dispatch(removeItemFromWishlist(item));
  }

  const removeFromWishlist = (item) => {
    confirm('Apakah anda yakin ingin menghapus item ini dari wishlist?');
    dispatch(removeItemFromWishlist(item));
  }
  return (
      <div className="py-4">
        <h1 className='text-xl font-bold text-center'>Wishlist Kamu</h1>
        {wishlist?.length > 0 ? (
          <Carousel className="w-full mt-6 md:mt-14">
            <CarouselContent>
              {wishlist?.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                  <div className="p-1">
                    <div className='relative'>
                      <img className='w-full object-cover h-[169px]' src={item.imageUrl} alt={item.name} />
                      <div className='absolute bottom-0 w-full'>
                        <Button onClick={() => addCart(item)} className="flex items-center justify-center gap-2 w-[80%] text-xs rounded-s-none rounded-r-full">Masukkan <br/> Keranjang <ShoppingBasket size={18} /></Button>
                      </div>
                      <Button onClick={() => removeFromWishlist(item)} className='absolute top-2 right-4 p-2 bg-red-500 rounded-full'>
                        <Trash size={24} />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div>
            <img
              className="w-1/4 mx-auto mb-4"
              src={emptyWishlist}
              alt="wishlist icons"
            />
            <h1 className="text-center">
              Anda Belum Mempunyai Produk Favorite
            </h1>
          </div>
        )}
        <Separator className="my-4" />
        <ProductList title="Rekomendasi produk" />
      </div>
  );
};

export default WishList;
