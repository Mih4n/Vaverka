<template>
    <Carousel :items="items">
        <template #item="{ item }">
            <div class="slide">
                <h2 class="white">{{ item.title }}</h2>
                <h3 class="white">{{ item.description }}</h3>
                <button class="button white p10">
                    <h3>Просмотреть коллекцию</h3>
                </button>
            </div>
        </template>
    </Carousel>
</template>

<script lang="ts" setup>
import Carousel from '../base/Carousel.vue';

const items = [
    {
        title: 'Натуральные ткани',
        description: 'Лён и хлопок от белорусских производителей'
    },
    {
        title: 'Новая коллекция осень зима',
        description: 'Скидки до 50% на всю коллекцию'
    },
    {
        title: 'Традиции в современном стиле',
        description: 'Эксклюзивные вышиванки ручной работы'
    }
]
</script>

<style lang="less" scoped>
.slide {
    gap: 10px;
    height: 100%;
    display: flex;
    padding: 20px 60px 45px 60px;
    flex-direction: column;

    button {
        width: 300px;
        margin-top: auto;
    }
}
</style>
