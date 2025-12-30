<template>
    <Select
        :items="options"
        v-model="selected"
    >
        <template #label>
            <h3>Отсортировать по:</h3>
        </template>
        <template #item="{ item }">
            <div class="category-item">
                <Icon :name="item.icon" />
                <h4>{{ item.name }}</h4>
            </div>
        </template>
    </Select>
</template>

<script setup lang="ts">
import Icon from '../base/Icon.vue';
import Select from '../base/Select.vue';
import { storeToRefs } from 'pinia';
import { useGoodsStore } from '../../stores/goodsStore';
import { SortOption } from '../../models/SortOptions';
import { computed } from 'vue';

const { sort } = storeToRefs(useGoodsStore())
const selected = computed({
    get: () => options.find(o => o.value == sort.value),
    set: value => sort.value = value?.value
})

const options = [
    {
        icon: 'party',
        name: 'Популярность',
        value: SortOption.Popularity
    },
    {
        icon: 'arrowUp',
        name: 'Цена: по возрастанию',
        value: SortOption.CostUp
    },
    {
        icon: 'arrowDown',
        name: 'Цена: по убыванию',
        value: SortOption.CostDown
    },
    {
        icon: 'star',
        name: 'Рейтинг',
        value: SortOption.Score
    },
    {
        icon: 'bulb',
        name: 'Новинки',
        value: SortOption.New
    }
]
</script>