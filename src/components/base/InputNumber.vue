<template>
    <div class="input number outline">
        <input
            type="number"
            :min="min"
            :max="max"
            :step="step"
            :placeholder="placeholder"
            :value="inputValue"
            @input="onInput"
            @blur="onBlur"
        />
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    min?: number
    max?: number
    step?: number
    placeholder?: string
}>()

const model = defineModel<number | undefined>()
const inputValue = ref<string>('')

const clamp = (value: number) => {
    if (props.min !== undefined && value < props.min) {
        return props.min
    }
    if (props.max !== undefined && value > props.max) {
        return props.max
    }
    return value
}

watch(
    model,
    (newValue) => {
        if (newValue !== undefined && String(newValue) === inputValue.value) {
            return
        }
        
        inputValue.value = newValue === undefined ? '' : String(newValue)
    },
    { immediate: true }
)

function onInput(event: Event) {
    const raw = (event.target as HTMLInputElement).value
    inputValue.value = raw

    if (raw === '') {
        model.value = undefined
        return
    }

    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return

    model.value = clamp(parsed)
}

function onBlur() {
    if (model.value === undefined) {
        inputValue.value = ''
        return
    }

    const clamped = clamp(model.value)
    model.value = clamped
    inputValue.value = String(clamped)
}
</script>

<style scoped lang="less">
.number {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
}
</style>