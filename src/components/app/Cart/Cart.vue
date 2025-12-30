<template>
    <div class="cart" :class="{ open: open }">
        <div class="card content">
            <header>
                <div class="icon">
                    <Icon name="cross" />
                    <h3>Корзина</h3>
                </div>

                <Icon name="cross" @click="open = !open"/>
            </header>
            <div class="items-cards">
                <CartItem 
                    v-for="product in products"
                    :key="`cart-item-${product.product.name}`"
                    :item="product"
                />
            </div>
        </div>
        <div class="background"></div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../../stores/CartStore';
import { watch } from 'vue';
import Icon from '../../base/Icon.vue';
import CartItem from './CartItem.vue';

const { open } = storeToRefs(useCartStore())
const { products } = useCartStore()

watch(open, (value) => {
    const body = document.querySelector('body')
    if (value)
        body?.classList.add('stack')
    else 
        body?.classList.remove('stack')
})
</script>

<style lang="less" scoped>
.cart {
    transition: all 0.3s ease;

    .u-icon {
        height: 16px;
        aspect-ratio: 1;
    }

    .background {
        top: 0;
        left: 0;
        position: absolute;

        width: 100%;
        height: 100%;

        opacity: 0;
        pointer-events: none;
        background-color: var(--gray);
        z-index: 1000;

        transition: inherit;
    }

    .content {
        top: 0;
        right: -40%;
        padding: 20px;
        position: absolute;

        width: 40%;
        height: 100dvh;
        z-index: 1001;

        transition: inherit;

        border-radius: 20px 0 0 20px;
        
        header {
            width: 100%;
            display: flex;
            
            align-items: center;
            justify-content: space-between;

            .icon {
                gap: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}

.cart.open {
    .background {
        opacity: 0.4;
        pointer-events: all;
    }

    .content {
        right: 0;
    }
}
</style>

