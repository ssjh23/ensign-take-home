import axios from 'axios'
import { Product } from '../models/products'

export const getAllProducts = async():Promise<Product[]> => {
    try {
        const res = await axios.get('https://fakestoreapi.com/products/')
        return res.data
    } catch (err: any) {
        return err.response
    }
}

export const getOneProductById = async(id: string | undefined):Promise<Product> => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        return res.data
    } catch (err: any) {
        return err.response
    }
} 