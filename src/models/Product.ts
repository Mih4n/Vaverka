import { Attribute } from "./Attribute"

export interface Product {
    name: string
    imageUrl: string
    score: number
    scored: number
    price: number
    categoriesIds: number[]
    sizes: number[]
    sale?: number
    materials: string[]
    attributes?: Attribute[]
}

export function getActualPrice(product: Product) {
    const sale = product.sale
    const price = product.price
    if (!sale) return price
    return price - price * sale / 100
}