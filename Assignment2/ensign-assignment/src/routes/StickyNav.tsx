import { useEffect, useState } from 'react';
import shoppingCartIcon from '../assets/cart.svg';
import useShoppingCartStore from '../store/store';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function StickyNav() {
    const { userid } = useParams()
    const navigate = useNavigate()
    const allCustomers = useShoppingCartStore(state => state.items)
    const calculateTotalItems = () => {
        let totalItems = 0
        for (const customer of allCustomers) {
            if (customer.customerId === userid) {
                for (const item of customer.items) {
                    totalItems += item.quantity
                }
            }
        }
        return totalItems
    }
    // Assign shopping cart items to a vairable by iterating through all customers
    const [shoppingCartItems, setShoppingCartItems] = useState<number>(calculateTotalItems())
    // let shoppingCartItems = 0
    useEffect(() => {
        setShoppingCartItems(calculateTotalItems())
    }, [allCustomers])
    
    const navigateToShoppingCart = () => {
        navigate(`/${userid}/checkout`)
    }
    return (
    <>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-lg font-semibold tracking-wider text-gray-800 dark:text-white uppercase">Ensign Shopping</a>
                </div>
                <div onClick={navigateToShoppingCart} className='flex flex-row relative w-auto'>
                    <img src={shoppingCartIcon} alt="cart" className="h-10 w-10 z-0" />
                    <div className="absolute rounded-full bg-white text-center z-10 left-7 px-1 md: text-sm">
                        <p>{shoppingCartItems}</p>
                    </div>
                </div>
            </div>
        </nav>
        <Outlet />
    </>
    )

}