import HeaderProduct from '../HeaderProduct';
import ProductCard from '../ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectAllProducts } from '../../features/products/productSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductSlide = ({ title }) => {
  const data = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const terbaru = data.filter((item) => item.position === 'TERBARU');
  const datas = terbaru.slice(0, 10);

  if(datas.length === 0) return null
  return (
    <Carousel className="w-full mt-6 md:mt-14">
      <HeaderProduct title={title} path={'/productListing'} />
      <CarouselContent>
        {datas.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/4 md:basis-1/5 xl:basis-1/6">
            <div className="p-1">
              <ProductCard key={index} {...item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
// export const loader = async () => {
//   const product = await getProduct();
//   return product
// }

export default ProductSlide;
