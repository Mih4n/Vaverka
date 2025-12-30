<template>
    <MultiSelect
        :items="sizes"
        v-model="selectedSizes"
        class="size-multi-select"
    >
        <template #label>
            <h3>Размер</h3>
        </template>

        <template #item="{ item, selected }">
            <div 
                class="size-option input outline"
                :class="{ outlined: selected }"
            >
                <h4>{{ item }}</h4>
            </div>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MultiSelect from '../base/MultiSelect.vue';
import { useGoodsStore } from '../../stores/goodsStore';

const { sizes, selectedSizes } = storeToRefs(useGoodsStore())
</script>

<style scoped lang="less">
.size-multi-select {
    :deep(.content) {
        gap: 8px;
        flex-wrap: wrap;
        flex-direction: row;
    }
}
.size-option {
    cursor: pointer;
}
</style>