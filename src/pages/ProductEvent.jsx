import { useDispatch, useSelector } from "react-redux"
import { getProducts, selectAllProducts } from "../features/products/productSlice"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"

const ProductEvent = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectAllProducts)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  const event = products.filter((item) => item.position === 'EVENT')
  return (
    <>
      <div className="text-xl md:text-3xl font-bold mt-8 mb-5 inline-block">
        <h1>Product Event</h1>
        <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8">
        {event?.map((item, index) => (
          <ProductCard key={index} to={`/product/${item.id}`} {...item} />
        ))}
      </div>
    </>
  )
}

export default ProductEvent
