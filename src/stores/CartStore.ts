import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";

export const useCartStore = defineStore('cart', () => {
    const open = ref<boolean>(false)
    const products = ref<CartItem[]>([])
    const validProducts = computed(() =>
        products.value.filter(p => p.count > 0)
    )

    const addToCart = (product: Product) => {
        const existing = products.value.find(p => p.product == product)
        if (existing)
            if (existing.count <= 0)
                existing.count = 1
            else 
                existing.count++
        else 
            products.value.push({ count: 1, product: product })
    }

    return {
        open,
        products,
        validProducts, 

        addToCart
    }
})