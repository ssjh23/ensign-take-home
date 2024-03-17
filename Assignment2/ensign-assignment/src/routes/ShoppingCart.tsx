import { useNavigate, useParams } from "react-router-dom"
import useShoppingCartStore from "../store/store"
import { shoppingCartItem } from "../models/shoppingCart"
import ShoppingCartItem from "../components/ShoppingCartItem"
import { useState } from "react"

export default function ShoppingCart() {
    const { userid } = useParams()
    const navigate = useNavigate()
    const allCustomers = useShoppingCartStore(state => state.items)

    // Assign shopping cart items to a vairable by iterating through all customers
    let customerShoppingCartItems: shoppingCartItem[] = []
    for (const customer of allCustomers) {
        if (customer.customerId === userid) {
            customerShoppingCartItems = customer.items
        }
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0
        for (const item of customerShoppingCartItems) {
            totalPrice += item.product.price * item.quantity
        }
        return totalPrice.toFixed(2)
    }
    const [ totalPrice, setTotalPrice ] = useState<string>(calculateTotalPrice())
    const addQuantity = (userid: string, itemid: number) => {
        let currentItems = customerShoppingCartItems
        for (const item of currentItems) {
            if (item.product.id === itemid) {
                item.quantity += 1
                for (const customer of allCustomers) {
                    console.log(customer.customerId)
                    if (customer.customerId === userid) {
                        customer.items = currentItems
                        useShoppingCartStore.getState().setCart(allCustomers)
                        setTotalPrice(calculateTotalPrice())
                        return
                    }
                }
            }
        } 
    }

    const reduceQuantity = (userid: string, itemid: number) => {
        let currentItems = customerShoppingCartItems
        for (const item of currentItems) {
            if (item.product.id === itemid) {
                item.quantity -= 1
                for (const customer of allCustomers) {
                    if (customer.customerId === userid) {
                        customer.items = currentItems
                        console.log(currentItems)
                        useShoppingCartStore.getState().setCart(allCustomers)
                        setTotalPrice(calculateTotalPrice())
                        return
                    }
                }
            }
        }
    }

    const handleOrder = () => {
        // Check cart if empty
        if (customerShoppingCartItems.length === 0) {
            alert("Please add items to cart before placing order")
            
        } else {
            alert("Order placed successfully!")
            // Remove customer from shopping cart
            let remainingCustomers = allCustomers.filter((customer) => customer.customerId !== userid)
            useShoppingCartStore.getState().setCart(remainingCustomers)
        }
        navigate(`/${userid}/`)
    }
    const allShoppingCartItemCards = customerShoppingCartItems?.map((item: shoppingCartItem) => {
        return <ShoppingCartItem userid={userid} cartItem={item} addQuantity={addQuantity} reduceQuantity={reduceQuantity}/>
    })

    return (
        <><div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <a href="#" className="text-2xl font-bold text-gray-800">Ensign Shopping</a>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                <div className="relative">
                    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                            <span className="font-semibold text-gray-900">Shop</span>
                        </li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                            <span className="font-semibold text-gray-900">Shipping</span>
                        </li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                            <span className="font-semibold text-gray-500">Payment</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div><div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {allShoppingCartItemCards}
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div className="">


                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">${totalPrice}</p>
                        </div>
                    </div>
                    <button onClick={() => handleOrder()} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                </div>
            </div></>

    )
  }