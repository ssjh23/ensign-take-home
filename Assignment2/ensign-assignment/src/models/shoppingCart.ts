import { Product } from "./products";

export type customerShoppingCart = {
    items: shoppingCartItem[];
    customerId: string | undefined;
};

export type shoppingCartItem = {
    product: Product;
    quantity: number;
};