import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectAllProducts } from '../features/products/productSlice';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import Categories from '../components/Categories';

const Category = () => {
    const [limit, setLimit] = useState(10);
    const {category} = useParams()
    const dispatch = useDispatch()
    
    const products = useSelector(selectAllProducts)
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    if(category === 'all') {
        return (
            <>
                <Categories />
                <div className="text-xl md:text-3xl font-bold mt-8 mb-5 inline-block">
                    <h1 className="text-center">All Product</h1>
                    <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8">
                    {products?.map((item, index) => (
                        <ProductCard key={index} to={`/product/${item.id}`} {...item} />
                    ))}
                </div>
            </>
        )
    }
    
    const filterProduct = products.filter((item) => item.category === category)
    const handleLimit = () => {
        if(limit >= filterProduct.length) return
        setLimit((prev) => prev + 10);
    }
  return (
    <>
        <Categories />
      <div className="text-xl md:text-3xl font-bold mt-8 mb-5 inline-block">
        <h1 className="text-center">{filterProduct.length === 0 ? 'Product Not Found' : category}</h1>
        <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8">
        {filterProduct?.map((item, index) => (
          <ProductCard key={index} to={`/product/${item.id}`} {...item} />
        ))}
      </div>
      <div className="my-8 text-center">
        <Button className={`w-full ${limit >= filterProduct.length ? 'hidden' : ''}`} onClick={handleLimit}>Tampilkan Lebih Banyak
        </Button>
      </div>
    </>
  )
}

export default Category
