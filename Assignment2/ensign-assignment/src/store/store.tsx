import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { customerShoppingCart } from '../models/shoppingCart'

interface ShoppingCartState {
    items: customerShoppingCart[]
    setCart: (shoppingCartItems: customerShoppingCart[]) => void
}

const useShoppingCartStore = create<ShoppingCartState>()(
    persist(
        devtools((set) => ({
            items: [],
            setCart: (shoppingCartItems: customerShoppingCart[]) => set({ items: shoppingCartItems })
        })),
        {
            name: 'shoppingCart-storage'
        }
    )
)

export default useShoppingCartStore