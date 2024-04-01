import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBasketIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Pi } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItemToWishlist } from '../../features/wishlist/wishlistSlice';
import { addItem } from '../../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'

const ProductCard = ({ ...item }) => {
  const { authUser } = useAuthContext()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (item) => {
 
    if(authUser.roles === 'member') {
      toast.error('Anda Belum Menjadi Member Istimewa, Silahkan Mendaftar Terlebih Dahulu') 
      return
    }
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      toast.error('Item Sudah ditambahkan ke keranjang');
    }else{
      dispatch(addItem(item));
      toast.success('Item ditambahkan ke keranjang');
    }
  }

  const handleAddToWishlist = (item) => {
    const isItemInWishlist = wishlistItems.some((wishlistItem) => wishlistItem.id === item.id);

    if (isItemInWishlist) {
      toast.error('Item Sudah ditambahkan ke wishlist');
    }else{
      dispatch(addItemToWishlist(item));
      toast.success('Item ditambahkan ke wishlist');
    }
  }

  const handleCheckout = () => {
    if(authUser.roles === 'member') {
      toast.error('Anda Belum Menjadi Member Istimewa, Silahkan Mendaftar Terlebih Dahulu') 
      return
    }
    dispatch(addItem(item));
    navigate('/cart')
    toast.success('Item ditambahkan ke keranjang');
  }
  return (
    <Card className="bg-card relative h-[310px] md:h-[330px] shadow-md dark:shadow-primary/20">
      <div className="relative overflow-hidden rounded-t-md">
        <Link onClick={window.scrollTo(0, 0)} to={`/product/${item.id}`} className="w-full h-[200px]">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-[200px] object-cover"
        />
        </Link>
        <div className="absolute flex px-6 py-1 bottom-0 left-0 rounded-none rounded-se-2xl items-center font-bold bg-primary border-t border-yellow-700 dark:border-slate-200 text-white">
          <span>{item.price}</span>
          <Pi className="ml-2" size={16} />
        </div>
        <Button
          onClick={() => handleAddToWishlist(item)}
          size="sm"
          className="font-normal bg-white absolute top-2 left-2 rounded-full text-xs text-primary hover:text-white">
          <Heart size={14} />
        </Button>
      </div>
      <div className="p-2">
        <div className="flex flex-col gap-2 mb-2">
          <Link
            onClick={window.scrollTo(0, 0)}
            to={`/product/${item.id}`}
            className="font-semibold text-xs md:text-sm">
            {item.name.substring(0, 35)} {item.name.length > 35 && '...'}
          </Link>
          <div className="flex flex-col gap-1 flex-wrap text-xs">
            <p className="font-medium text-green-600 text-sm">
              Brand : {item.brand}
            </p>
          </div>
        </div>
        <Button
        onClick={()=>handleCheckout(item)}
        className="absolute bottom-0 left-0 rounded-none rounded-se-2xl rounded-es-md hover:rounded-full transition-all ease-in-out duration-300 hover:animate-bounce bg-lime-600 hover:bg-lime-700 text-xs flex items-center justify-center p-1">
          <Plus size={18} />
          Checkout
        </Button>
        <Button
        onClick={()=>handleAddToCart(item)}
        className="absolute bottom-0 right-0 rounded-none rounded-ss-2xl rounded-ee-md hover:rounded-full transition-all ease-in-out duration-300 hover:animate-bounce bg-yellow-700 dark:bg-secondary hover:bg-yellow-700 p-1">
          <ShoppingBasketIcon size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
