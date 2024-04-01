import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, selectAllProducts } from "../features/products/productSlice"
import { useEffect } from "react"

const Search = () => {
  const {query} = useParams()
  const dispatch = useDispatch()

  const products = useSelector(selectAllProducts)
  useEffect(() => {
    dispatch(getProducts())
  }, [ dispatch ])

  const search = (data)=>{
    return data.filter((item)=>{
      return item.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  if(search(products).length === 0) return <h1 className="text-3xl font-bold text-center mt-8">Product tidak ditemukan</h1>
  return (
    <div>
      <div className="text-xl md:text-3xl font-bold mt-8 mb-5 inline-block">
        <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8">
        {search(products)?.map((item, index) => (
          <ProductCard key={index} to={`/product/${item.id}`} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Search
