<script setup lang="ts">
import Header from './components/base/Header.vue';
import Carousel from './components/base/Carousel.vue';
import CategoriesCards from './components/app/CategoriesCards.vue';
import CategoriesSelect from './components/app/CategoriesSelect.vue';
import { useCategoriesStore } from './stores/categoriesStore';
import PriceRange from './components/app/PriceRange.vue';
import MaterialsSelect from './components/app/MaterialsSelect.vue';
import SizesSelect from './components/app/SizesSelect.vue';
import SortBy from './components/app/SortBy.vue';
import { useGoodsStore } from './stores/goodsStore';
import Goods from './components/app/goods/Goods.vue';
import { AttributeType } from './models/AttributeType';
import Cart from './components/app/Cart/Cart.vue';
import MainCarousel from './components/app/MainCarousel.vue';

useGoodsStore().setGoods([
    { name: 'Вышыванка класічная', categoriesIds: [ 1, 3 ], imageUrl: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 44, 46, 48, 50 ], score: 5, scored: 12, price: 120, materials: [ 'Лён', 'Хлопок' ] },
    { name: 'Сарочка льняная', categoriesIds: [ 1 ], imageUrl: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 46, 48, 50, 52 ], score: 4, scored: 8, price: 90, materials: [ 'Лён' ] },
    { name: 'Жылетка народная', categoriesIds: [ 2, 3 ], imageUrl: 'https://images.pexels.com/photos/6044227/pexels-photo-6044227.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 48, 50, 52 ], score: 5, scored: 5, price: 150, materials: [ 'Шерсть', 'Лён' ] },
    { name: 'Спадніца традыцыйная', categoriesIds: [ 1 ], imageUrl: 'https://images.pexels.com/photos/7691095/pexels-photo-7691095.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 42, 44, 46, 48 ], score: 4, scored: 6, price: 110, materials: [ 'Хлопок', 'Лён' ] },
    { name: 'Кашуля з арнаментам', categoriesIds: [ 2 ], imageUrl: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 44, 46, 48, 50, 52 ], score: 5, scored: 14, price: 130, materials: [ 'Хлопок', 'Лён' ], sale: 5, attributes: [{ type: AttributeType.New }, { type: AttributeType.Popular }] },
    { name: 'Пояс тканы', categoriesIds: [ 3 ], imageUrl: 'https://images.pexels.com/photos/6069553/pexels-photo-6069553.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 100, 110, 120 ], score: 4, scored: 4, price: 45, materials: [ 'Шерсть' ] },
    { name: 'Камізэлька льняная', categoriesIds: [ 2 ], imageUrl: 'https://images.pexels.com/photos/6311616/pexels-photo-6311616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 48, 50, 52, 54 ], score: 5, scored: 9, price: 170, materials: [ 'Лён' ], attributes: [{ type: AttributeType.Popular }] },
    { name: 'Хустка народная', categoriesIds: [ 3 ], imageUrl: 'https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 90 ], score: 4, scored: 7, price: 60, materials: [ 'Хлопок', 'Шёлк' ] },
    { name: 'Боты скураныя', categoriesIds: [ 4 ], imageUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', sizes: [ 40, 41, 42, 43, 44 ], score: 5, scored: 11, price: 220, materials: [ 'Кожа' ] }
])

useCategoriesStore().setCategories([
    { id: 0, name: 'Все категории', icon: 'shoppingCart', popularity: 0 },
    { id: 1, name: 'Женская одежда', icon: 'shoppingCart', popularity: 10 },
    { id: 2, name: 'Мужская одежда', icon: 'user', popularity: 8 },
    { id: 3, name: 'Аксессуары', icon: 'search', popularity: 5 },
    { id: 4, name: 'Обувь', icon: 'user', popularity: 7 },
])
</script>

<template>
    <Header />
    <main>
        <MainCarousel />
        <CategoriesCards />
        <div class="goods">
            <div class="filters">
                <div class="track">
                    <SortBy />
                    <CategoriesSelect />
                    <PriceRange />
                    <MaterialsSelect />
                    <SizesSelect />
                </div>
            </div>
            <div class="content">
                <Goods />
            </div>
        </div>
    </main>
    <Cart />
</template>

<style scoped lang="less">
main {
    padding: 0 var(--page-margin);
    display: flex;
    flex-direction: column;

    gap: 30px;

    .goods,
    .filters .track,
    .content {
        display: flex;
        flex-direction: column;
    }

    .filters .track,
    .content {
        gap: 20px;
    }

    .content {
        width: 100%;
    }

    .goods {
        gap: 30px;
        margin-bottom: 30px;
    }

    @media (min-width: 1200px) {
        .goods {
            flex-direction: row;
        }

        .filters {
            width: 350px;

            // .track {
            //     top: 90px;
            //     position: sticky;
            // }
        }
    }
}
</style>