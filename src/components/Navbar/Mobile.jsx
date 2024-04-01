import { User } from 'lucide-react';
import { ShoppingBagIcon } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Home } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Newspaper } from 'lucide-react';

const Mobile = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  return (
    <div className='mx-auto w-[300px]'>
    <nav className="max-w-2xl  mx-auto fixed z-50 bottom-0 left-0 bg-background border-t-[1px] right-0">
      <div className="flex justify-between items-center dark:[&_.active]:bg-white [&_.active]:bg-primary dark:[&_.active]:text-primary [&_.active]:text-white">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
          <Home className="w-4 h-4" />
          <span className="text-sm">Home</span>
        </NavLink>
        <NavLink
          to="/cart"
          className="relative flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
          <ShoppingBagIcon className="w-4 h-4" />
          {cartItems.length > 0 && (
              <div className="absolute top-1 right-5 w-7 h-7 rounded-full bg-primary text-white flex justify-center items-center">
                {cartItems.length}
              </div>
            ) }
          <span className="text-sm">Keranjang</span>
        </NavLink>
        <NavLink
          to="/news"
          className="relative flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
          <Newspaper className="w-4 h-4 text-yellow-700" />
          <span className="text-sm">News</span>
        </NavLink>
        <NavLink
          to="/wishlist"
          className="relative flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
          <Heart className="w-4 h-4" />
          {wishlistItems.length > 0 && (
              <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-primary text-white flex justify-center items-center">
                {wishlistItems.length}
              </div>
            ) }
          <span className="text-sm">Wishlist</span>
        </NavLink>
        <NavLink
          to="/profile"
          className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
          <User className="w-4 h-4" />
          <span className="text-sm">Profile</span>
        </NavLink>
      </div>
    </nav>
    </div>
  );
};

export default Mobile;