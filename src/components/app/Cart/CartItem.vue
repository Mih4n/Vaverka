<template>
    <div class="cart-item light-gray">
        <div class="image"></div>
        <div class="controls">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '../../../models/CartItem';

const props = defineProps<{
    item: CartItem
}>()
</script>

<style lang="less" scoped>
.cart-item {
    width: 100%;
    height: 80px;

    gap: 10px;
    display: flex;
}
</style>