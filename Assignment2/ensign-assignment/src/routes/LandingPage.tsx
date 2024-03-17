import ProductCard from "../components/ProductCard";

import { getAllProducts } from "../api/products";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../models/products";
import LoadingLandingPage from "./LoadingLandingPage";

export default function LandingPage() {
  const { 
    data: allProducts, 
    isLoading: loadingProducts
} = useQuery({queryKey: ['products'], queryFn: getAllProducts})

  const allProductCards = allProducts?.map((product: Product) => {
    return <ProductCard product={product}/>
  })

  return (
    loadingProducts ? 
    <LoadingLandingPage/> :
    <div className="flex justify-center fixed h-full w-full pt-20 overflow-auto scroll-smooth">
      <div className="w-5/6 grid grid-cols-2 gap-4 md:grid-cols-3 ">
          {allProductCards}
        </div>
    </div>
  )
}