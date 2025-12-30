<template>
    <div class="price-range card">
        <div class="title">
            <h3>Цена</h3>
        </div>

        <div class="inputs">
            <InputNumber
                v-model="minValue"
                :min="range.min"
                :max="range.max"
                placeholder="От"
            />
            <InputNumber
                v-model="maxValue"
                :min="range.min"
                :max="range.max"
                placeholder="До"
            />
        </div>

        <Slider
            v-model="slider"
            range
            class="slider"
            :step="0.01"
            :min="range.min"
            :max="range.max"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Slider from 'primevue/slider'
import InputNumber from '../base/InputNumber.vue'
import { storeToRefs } from 'pinia'
import { useGoodsStore } from '../../stores/goodsStore'

const { priceRange: range, priceFromTo: price } = storeToRefs(useGoodsStore())

const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max)

const slider = ref<[number, number]>([0, 0])

watch(
    [range, price],
    ([r, p]) => {
        slider.value = [
            clamp(p.min, r.min, r.max),
            clamp(p.max, r.min, r.max)
        ]
    },
    { immediate: true, deep: true }
)

const minValue = computed<number | undefined>({
    get: () => slider.value[0],
    set(value) {
        const v = clamp(
            value ?? range.value.min,
            range.value.min,
            slider.value[1]
        )

        slider.value = [v, slider.value[1]]
        price.value.min = v
    }
})

const maxValue = computed<number | undefined>({
    get: () => slider.value[1],
    set(value) {
        const v = clamp(
            value ?? range.value.max,
            slider.value[0],
            range.value.max
        )

        slider.value = [slider.value[0], v]
        price.value.max = v
    }
})

watch(slider, ([min, max]) => {
    price.value.min = min
    price.value.max = max
})
</script>

<style scoped lang="less">
.price-range {
    .slider {
        flex: 1;
        min-height: 4px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
</style>