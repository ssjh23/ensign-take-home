import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../models/products";

interface P {
    product: Product
}

export default function ProductCard({product}: P) {
    const { userid } = useParams();
    const navigate = useNavigate();
    const {
        title,
        price,
        image: img,
        id
    } = product
    
    const navigateToProductDetail = () => {
        navigate(`/${userid}/product/${id}`, {state: {product}})
    }
    return (
      <div onClick={navigateToProductDetail} className="flex flex-col justify-items-center h-52 p-4 md:h-68 bg-white border-2 rounded border-black">
        <img src={ img } alt="Product" className="min-h-32 w-full object-contain"/>
        <div>
            <h5 className="text-md tracking-tight pt-2 text-slate-900 truncate">{title}</h5>
        </div>
        <p>
            <span className="col-end-2 self-start justify-self-start text-xs">${ price }</span>
        </p>

      </div>
    )
  }