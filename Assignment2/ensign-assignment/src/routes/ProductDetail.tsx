import { useNavigate, useParams } from "react-router-dom"
import { Product } from "../models/products"
import shoppingCartIcon from "../assets/cart.svg"
import { getOneProductById } from "../api/products"
import { useQuery } from "@tanstack/react-query"
import useShoppingCartStore from "../store/store"
import { customerShoppingCart } from "../models/shoppingCart"

export default function ProductDetail() {
    const navigate = useNavigate()
    const { userid, itemid }  = useParams()
    let {
        data: product,
        isLoading,
    } = useQuery({queryKey: ['product', itemid], queryFn: () => getOneProductById(itemid)})

    const addToCart = (product: Product)  => {
        alert('Successfully added to cart')
        let currentCustomers = useShoppingCartStore.getState().items
        // Browser does not contain shopping cart
        if (currentCustomers.length === 0) {
            const newCustomer: customerShoppingCart = {
                customerId: userid,
                items: [{product: product, quantity: 1}]
            }
            currentCustomers.push(newCustomer)
            useShoppingCartStore.getState().setCart(currentCustomers)
            navigate(0)
            return
        }

        for (const customer of currentCustomers) {
            // Customer has existing shopping cart
            if (customer.customerId === userid) {
                // Customer may have cleared shopping cart previously
                if (customer.items.length === 0) {
                    customer.items.push({product: product, quantity: 1})
                    useShoppingCartStore.getState().setCart(currentCustomers)
                    navigate(0)
                    return
                }
                // Customer has existing shopping cart with item already in shopping cart
                for (const item of customer.items) {
                    if (item.product.id === product.id) {
                        item.quantity += 1
                        useShoppingCartStore.getState().setCart(currentCustomers)
                        navigate(0)
                        return
                    }
                }
                // Customer has existing shopping cart with item not in shopping cart
                customer.items.push({product: product, quantity: 1})
                useShoppingCartStore.getState().setCart(currentCustomers)
                navigate(0)
                return 
            } 
        }

        const newCustomer: customerShoppingCart = {
            customerId: userid,
            items: [{product: product, quantity: 1}]
        }
        currentCustomers.push(newCustomer)
        useShoppingCartStore.getState().setCart(currentCustomers)
        return
    }

    return isLoading ?  (<div>Loading...</div>) : (
        <div className="w-full h-full pt-20 pb-20 md:pb-0 flex justify-center relative">
            <div className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl justify-center" href="#">
                    <img className="object-contain" src={product.image} alt="product image" />
                </a>
                <div className="mt-4 px-5 pb-5">
                    <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex">
                            <span className="mr-1 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product?.rating.rate}</span>
                            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        </div>
                        <div>
                            <span className="text-xs text-slate-900">{product.rating.count} reviews</span>
                        </div>
                    </div>
                        <p>
                            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                        </p>
                    </div>
                    <p>
                        <span className="text-sm text-slate-900">{product.description}</span>
                    </p>
                    <div onClick={() => addToCart(product)} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 mt-4 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</div>
                </div>
            </div>
            <>
    `        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 bottom-0 start-0 border-b border-gray-200 dark:border-gray-600 md:hidden">
                <div onClick={() => addToCart(product)} className="max-w-screen-xl flex flex-wrap justify-center mx-auto p-4">
                    <div className="flex items-center space-x-4">
                        <a href="/" className="text-xs font-light tracking-wider text-gray-800 dark:text-white uppercase">Add To Cart</a>
                    </div>
                    <div className='flex flex-row relative w-auto'>
                        <img src={shoppingCartIcon} alt="cart" className="h-7 w-8 z-0" />
                        <div className="absolute rounded-full *:text-center z-10 top-0.5 left-2.5 px-1 md: text-sm">
                            <p className="text-xs text-white font-semibold">+</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
        </div>
    )
  }