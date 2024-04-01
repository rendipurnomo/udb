import { ArrowLeft } from 'lucide-react';
import { Pi } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProductList from '@/components/ProductList';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishlist } from '../features/wishlist/wishlistSlice';
import { addItem } from '../features/cart/cartSlice';
import { useAuthContext } from '../context/AuthContext';
import { getProducts, selectAllProducts } from '../features/products/productSlice';
import { useEffect } from 'react';

const Product = () => {
  const { authUser } = useAuthContext()
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
      window.scrollTo(0, 0);
      toast.success('Item ditambahkan ke wishlist');
    }
  }

  const handleCheckout = ({...item}) => {
    if(authUser.roles === 'member') {
      toast.error('Anda Belum Menjadi Member Istimewa, Silahkan Mendaftar Terlebih Dahulu')
      return
    }
    dispatch(addItem(item));
    navigate('/cart')
  }

  const datas = products.find((item) => item.id === id);
  return (
    <>
      <div className="-mt-8 ">
        <div className="h-[8vh] sticky top-0 flex justify-between items-center border-b border-foreground mb-4">
          <ArrowLeft onClick={() => navigate('/')} className="cursor-pointer" />
          {cartItems.length > 0 && (
            <div className="relative flex items-center gap-4">
              <ShoppingCart onClick={() => navigate('/cart')} />
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-primary text-white flex justify-center items-center">
                {cartItems.length}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <img
            className="w-full h-[300px] rounded-md object-cover"
            src={datas.imageUrl}
            alt="product"
          />
          <div className="absolute -bottom-3 h-[50px] w-full bg-gradient-to-r from-primary to-destructive rounded-t-xl flex items-center border-b-2 border-foreground">
            <p className="text-white font-bold ml-4">{datas.category}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="font-extralight text-lg">{datas.name}</p>
        <div className="flex justify-end items-center space-y-4">
          <Heart className="cursor-pointer hover:text-primary" onClick={() => handleAddToWishlist(datas)} />
        </div>
        <p className="bg-white/10 p-2 rounded-md inline-flex gap-2 font-semibold">
          {datas.price}
          <Pi />
        </p>
      </div>
      <Separator className="my-4" />
      <div className="mt-4">
        <h2 className="font-bold text-xl">Deskripsi produk</h2>
        <p className="font-extralight">{datas.description}</p>
      </div>
      <Separator className="my-4" />
      <ProductList title="Lainnya yang anda sukai" />
      <Separator className="my-4 mb-24" />
      <div className="fixed bottom-0 left-0 right-0 border-t z-50 bg-background p-4 py-6 flex gap-4 items-center">
        <Button onClick={() =>handleCheckout(datas)} variant="outline" className="w-full">
          Beli Sekarang
        </Button>
        <Button onClick={() => handleAddToCart(datas)} className="w-full">
          <Plus /> Keranjang
        </Button>
      </div>
    </>
  );
};

export default Product;
