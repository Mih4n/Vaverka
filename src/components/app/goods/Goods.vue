<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Product from './Product.vue';
import { useGoodsStore } from '../../../stores/goodsStore';

const store = useGoodsStore()
const { filteredGoods } = storeToRefs(store)
</script>

<template>
    <div class="goods-grid">
        <Product 
            v-for="product in filteredGoods" 
            :product="product"
        />
    </div>
</template>

<style lang="less" scoped>
.goods-grid {
    width: 100%;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1600px) {
    .goods-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }    
}

@media (max-width: 800px) {
    .goods-grid {
        gap: 10px;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }    
}
</style>