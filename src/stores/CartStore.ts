import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { CartItem } from "../models/CartItem";

export const useCartStore = defineStore('cart', () => {
    const open = ref<Boolean>(false)
    const products = reactive<CartItem[]>([])

    return {
        open,
        products 
    }
})