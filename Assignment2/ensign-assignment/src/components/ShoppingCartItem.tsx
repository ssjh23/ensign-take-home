
import { useState } from "react"
import { shoppingCartItem } from "../models/shoppingCart"
import useShoppingCartStore from "../store/store"
import { useNavigate } from "react-router-dom"


interface P {
    userid: string | undefined
    cartItem: shoppingCartItem
    addQuantity: Function
    reduceQuantity: Function
}

export default function ShoppingCartItem({ userid, cartItem, addQuantity, reduceQuantity }:P) {
    const navigate = useNavigate()
    const [shoppingCartItemCount, setShoppingCartItemCount] = useState<number>(cartItem.quantity)
    const handleAddQuantity = () => {
        setShoppingCartItemCount(shoppingCartItemCount + 1)
        addQuantity(userid, cartItem.product.id)
    }
    const handleReduceQuantity = () => {
        if (shoppingCartItemCount > 0) {
            setShoppingCartItemCount(shoppingCartItemCount - 1)
            reduceQuantity(userid, cartItem.product.id)
        }
    }

    const handleRemove = () => {
        // Remove item from shopping cart
        alert("Item removed from shopping cart")
        let currentCustomers = useShoppingCartStore.getState().items
        for (const customer of currentCustomers) {
            if (customer.customerId === userid) {
                let newItems = customer.items.filter(item => item.product.id !== cartItem.product.id)
                customer.items = newItems
                useShoppingCartStore.getState().setCart(currentCustomers)
            }
        }
        navigate(`/${userid}/checkout`)
    }
    return (
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-contain object-center" src={cartItem.product.image} alt="" />
            <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{cartItem.product.title}</span>
                <div className="flex flex-row justify-between">
                    <p className="text-lg font-bold">${cartItem.product.price}</p>
                    <div className="flex flex-row items-center">
                        <div onClick={() => handleAddQuantity()} className="p-2">+</div>
                        <input type="text" className="w-8 h-8 text-center" value={shoppingCartItemCount} />
                        <div onClick = {() => handleReduceQuantity()} className="p-2">-</div>
                    </div>
                </div>
                <div onClick={() => handleRemove()} className="p-1 rounded border-2 border-red-400 text-red-400 self-end">Remove</div>
            </div>
        </div>
    )
}