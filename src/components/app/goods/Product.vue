<template>
    <div class="shadow card product">
        <div class="image" :style="{ backgroundImage: `url(${product.imageUrl})` }">
            <div class="attributes">
                <div class="attribute primary" v-for="attribute in product.attributes">
                    <h4 class="white">{{ attributeTypeToName(attribute.type) }}</h4>
                </div>
                <div class="attribute discount" v-if="product.sale">
                    <h4 class="white">-{{ product.sale }}%</h4>
                </div>
            </div>
        </div>
        <div class="description">
            <div class="score" v-if="product.scored">
                <Icon name="star" class="star" />
                <h4>{{ product.score }}</h4> 
                <h4 class="light-gray">({{ product.scored }})</h4>
            </div>
            <h4>{{ product.name }}</h4>
            <div class="cost" :class="{ sale: product.sale }">
                <h4 class="actual-cost">
                    {{ product.price - product.price * (product.sale ?? 0) / 100 }} BYN
                </h4>
                <h4 class="discount" v-if="product.sale">
                    {{ product.price }}
                </h4>
            </div>
            <button class="button primary m p10" :class="{ 'success': isAdded }" @click="() => handleAddToCart(product)">
                <Icon name="shoppingCart" /> 
                <h4>
                    {{ isAdded ? 'Добавлено!' : 'В корзину' }}
                </h4>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '../../base/Icon.vue';
import { Product } from '../../../models/Product';
import { AttributeType } from '../../../models/AttributeType';
import { useCartStore } from '../../../stores/CartStore';
import { ref } from 'vue';

const { addToCart } = useCartStore()

const props = defineProps<{
    product: Product
}>()

const isAdded = ref(false)
const handleAddToCart = (product: Product) => {
    addToCart(product)
    isAdded.value = true
    
    setTimeout(() => {
        isAdded.value = false
    }, 2000)
}

const attributeTypeToName = (type: AttributeType) => {
    const map = new Map([
        [AttributeType.New, 'Новинка'],
        [AttributeType.Popular, 'Популярное']
    ])

    return map.get(type)
}
</script>

<style lang="less" scoped>
.product {
    padding: 0;
    aspect-ratio: 1/2;

    .image {
        padding: 10px;
        width: 100%;
        height: calc(100% / 3 * 2);
        background: var(--primary);

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        .attributes {
            display: inline-grid;
            grid-auto-rows: min-content;
            gap: 10px;
        }

        .attribute {
            height: 25px;

            padding: 5px;
            border-radius: 5px;

            display: flex;
            align-items: center;
            justify-content: center;

            &:first-child:not(&:last-child) {
                border-radius: 10px 10px 5px 5px;
            }
            &:last-child:not(&:first-child) {
                border-radius: 5px 5px 10px 10px;
            }
        }
    }
    .description {
        gap: 10px;
        display: flex;
        flex-direction: column;

        width: 100%;
        padding: 10px;
        padding-top: 0;
        height: calc(100% / 3 * 1);

        .score {
            gap: 5px;
            display: flex;

            .star {
                fill: #ff8904;
                color: #ff8904;
                height: 16px;
                aspect-ratio: 1;
            }
        }

        .cost {
            gap: 5px;
            display: flex;
            margin-top: auto;
            &.sale {
                .actual-cost {
                    color: var(--discount);
                }
                .discount {
                    color: var(--light-gray);
                    text-decoration: line-through;
                }
            }
        }
        .button {
            :deep(.u-icon) {
                height: 100%;
                aspect-ratio: 1;
            }
        }
    }
}
</style>