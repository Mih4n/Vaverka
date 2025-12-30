<template>
    <div class="multi-select card">
        <slot name="label" />

        <div class="content">
            <div
                v-for="(item, index) in items"
                :key="`item-multiselect-${index}`"
                class="item"
                :class="{ selected: selectedIndexes.has(index) }"
                @click="toggle(index)"
            >
                <slot name="item" :item="item" :selected="selectedIndexes.has(index)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { reactive } from 'vue';

const props = defineProps<{
    items: T[]
}>()

const model = defineModel<T[]>()
const selectedIndexes = reactive<Set<number>>(new Set())

const toggle = (index: number) => {
    if (selectedIndexes.has(index))
        selectedIndexes.delete(index)
    else
        selectedIndexes.add(index)

    const items: T[] = []
    selectedIndexes.forEach(i => items.push(props.items[i]))
    model.value = items;
}
</script>

<style lang="less">
.multi-select {
    .content {
        gap: 5px;
        display: flex;
        flex-direction: column;
    }
}
</style>