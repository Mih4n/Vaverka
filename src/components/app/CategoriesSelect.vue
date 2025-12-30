<script setup lang="ts">
import Select from '../base/Select.vue';
import Icon from '../base/Icon.vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '../../stores/categoriesStore';

const { selectCategory } = useCategoriesStore();
const { categories, selectedCategory } = storeToRefs(useCategoriesStore());
</script>

<template>
    <Select
        :items="categories"
        v-model="selectedCategory"
        @update:model-value="selectCategory"
    >
        <template #label>
            <h3>Выберите категорию</h3>
        </template>
        <template #item="{ item }">
            <div class="category-item">
                <Icon :name="item.icon" />
                <h4>{{ item.name }}</h4>
            </div>
        </template>
    </Select>
</template>