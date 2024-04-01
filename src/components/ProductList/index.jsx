import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectAllProducts } from '../../features/products/productSlice';
import { useEffect } from 'react';

const ProductList = ({ title }) => {
  const [limit, setLimit] = useState(10);

  const data = useSelector(selectAllProducts);
  const terlaris = data.filter((item) => item.position === 'TERLARIS');
  const datas = terlaris.slice(0, limit);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleLimit = () => {
    if(limit >= data.length) return
    setLimit((prev) => prev + 10);
  }

  if(datas.length === 0) return null
  return (
    <>
      <div className="text-xl md:text-3xl font-bold mt-8 mb-5 inline-block">
        <h1>{title}</h1>
        <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8">
        {datas.map((item, index) => (
          <ProductCard key={index} to={`/product/${item.id}`} {...item} />
        ))}
      </div>
      <div className="my-8 text-center">
        <Button className={`w-full ${limit >= data.length ? 'hidden' : ''}`} onClick={handleLimit}>Tampilkan Lebih Banyak
        </Button>
      </div>
    </>
  );
};

export default ProductList;
