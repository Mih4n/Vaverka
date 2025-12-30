<template>
    <div class="cart-item outline no-focus card">
        <div class="image" :style="{ backgroundImage: `url(${item.product.imageUrl})`}"></div>
        <div class="content">
            <h4>{{ item.product.name }}</h4>
            <h4 class="primary">{{ item.product.price }} BYN</h4>
            <div class="controls">
                <div class="count">
                    <button class="button m outline p10" @click="() => item.count--"><h4>-</h4></button>
                    <InputNumber :min="0" :max="99" class="input" v-model="item.count"/>
                    <button class="button m outline p10" @click="() => item.count++"><h4>+</h4></button>
                </div>
                <h4 class="remove pointer primary" @click="() => item.count = 0">Удалить</h4>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputNumber from '../../base/InputNumber.vue';
import { CartItem } from '../../../models/CartItem';

const props = defineProps<{
    item: CartItem
}>()
</script>

<style lang="less" scoped>
.cart-item {
    width: 100%;
    height: 120px;
    padding: 10px;
    gap: 10px;
    display: flex;
    flex-direction: row;

    .image {
        height: 100%;
        aspect-ratio: 1 / 1;
        flex: 0 0 auto;

        border-radius: 10px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .content {
        gap: 5px;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;

        .controls {
            display: flex;
            margin-top: auto;
            align-items: center;
            justify-content: space-between;

            .count {
                gap: 5px;
                display: flex;
                width: 120px;

                button,
                .input {
                    height: 30px;
                    padding: 5px;
                }

                .input {
                    min-width: 40px;
                    :deep(input) {
                        text-align: center; 
                    }
                }
            }

            .remove {
                margin-top: auto;
            }
        }
    }
}

</style>