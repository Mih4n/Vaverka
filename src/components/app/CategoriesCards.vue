<script setup lang="ts">
import Cards from '../base/Cards/Cards.vue';
import stringToSoft from '../../services/stringToColor';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '../../stores/categoriesStore';
import { Category } from '../../models/Category';

const { selectCategory } = useCategoriesStore()
const { categories, selectedCategory } = storeToRefs(useCategoriesStore());

const toCard = (entity: Category) => ({
    icon: entity.icon,
    color: stringToSoft(entity.name),
    title: entity.name,
    description: `Description for ${entity.name}`
});

const categoriesToShow = categories.value.slice().sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 4);
</script>

<template>
    <Cards 
        :toCard="toCard"
        :models="categoriesToShow" 
        v-model="selectedCategory"
        @update:model-value="(value) => selectCategory(value)"
    />
</template>

