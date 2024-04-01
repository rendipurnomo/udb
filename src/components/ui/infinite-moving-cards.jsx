import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import HeaderProduct from '../HeaderProduct';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { Pi } from 'lucide-react';
import { getProducts, selectAllProducts } from '../../features/products/productSlice';

export const InfiniteMovingCards = ({
  direction = 'right',
  speed = 'slow',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else if (speed === 'slow') {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '100s');
      }
    }
  };

  const navigate = useNavigate();
  const { authUser } = useAuthContext()
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const data = products?.filter((item) => item.position === 'EVENT');
  // const handleCheckout = () => {
  //   if(authUser.event === false ) {
  //     toast.error('Product ini hanya bisa dibeli oleh member yang terdaftar di Event')
  //     return
  //   }
  //   dispatch(addItem(item));
  //   navigate('/cart');
  //   toast.success('Item ditambahkan ke keranjang');
  // };

  if(data?.length === 0) return null
  return (
    <div className="mt-5">
      <HeaderProduct className={'-mb-6'} title="Product Event" path="/productEvent" />
      <div
        ref={containerRef}
        className={cn(
          'scroller relative max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
          className
        )}>
        <ul
          ref={scrollerRef}
          className={cn(
            ' flex min-w-full shrink-0 gap-4 w-max flex-nowrap',
            start && 'animate-scroll ',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}>
          {data?.map((item, idx) => (
            <Link
              to={`${ authUser.event ? `/product/${item.id}` : '/event'}`}
              className="w-[250px] h-[300px] max-w-full relative rounded-2xl border  flex-shrink-0 border-slate-700 shadow-md md:w-[450px] overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
              }}
              key={item.id}>
              <img
                className="w-full object-cover h-[200px]"
                src={item.imageUrl}
                alt={item.title}
              />
              <h1 className="px-4 py-2 font-semibold">
                {item.name.length > 20
                  ? item.name.slice(0, 20) + '...'
                  : item.name}
              </h1>
              <p className="px-2 py-1 bg-primary text-center text-sm font-bold text-white">
                {item.price} <Pi className="inline w-4 h-4 dark:text-yellow-500" />
              </p>
              <p className="text-center">Khusus Event Offline</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
