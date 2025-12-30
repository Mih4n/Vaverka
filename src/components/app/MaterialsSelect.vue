<template>
    <MultiSelect
        :items="materials"
        v-model="selectedMaterials"
    >
        <template #label>
            <h3>Материал</h3>
        </template>

        <template #item="{ item }">
            <div class="material-item">
                <div class="check">
                    <div class="dot">
                    </div>
                </div>
                <h4>
                    {{ item }}
                </h4>
            </div>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MultiSelect from '../base/MultiSelect.vue';
import { useGoodsStore } from '../../stores/goodsStore';

const { materials } = storeToRefs(useGoodsStore())
const { selectedMaterials } = storeToRefs(useGoodsStore()) 
</script>

<style lang="less" scoped>
.material-item {
    gap: 5px;
    display: flex;
    cursor: pointer;

    .check {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 20px;
        height: 20px;

        border-radius: 5px;
        background-color: var(--light-gray);

        transition: all 0.3s ease;

        .dot {
            width: 0;
            height: 0;

            background-color: white;

            transition: inherit;
        }
    }

    &:hover {
        .check {
            background-color: var(--primary);
        }
    }
}

.selected .material-item {
    .check {
        background-color: var(--primary);

        .dot {
            width: 10px;
            height: 10px;

            border-radius: 2.5px; 
        }
    }
}
</style>