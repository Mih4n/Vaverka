<template>
    <div class="select card">
        <slot name="label" />

        <div class="content">
            <div
                v-for="(item, index) in items"
                :key="`item-select-${index}`"
                class="item"
                :class="{ selected: selectedIndex === index }"
                @click="select(index)"
            >
                <slot name="item" :item="item" />
            </div>

            <Transition name="fade">
                <div
                    v-show="selectedIndex !== null"
                    class="selection-marker"
                    :style="selectedStyle"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    items: T[];
}>();
const model = defineModel<T>();

const gap = 5;
const itemHeight = 44;

const selectedIndex = ref<number | null>(null);

const select = (index: number) => {
    selectedIndex.value = index;
    model.value = props.items[index];
};

const selectedStyle = computed(() => {
    if (selectedIndex.value === null) {
        return {};
    }

    return {
        transform: `translateY(${selectedIndex.value * (itemHeight + gap)}px)`
    };
});

watch(model, (newValue) => {
    const index = props.items.findIndex(item => item === newValue);
    selectedIndex.value = index !== -1 ? index : null;
}, { immediate: true });
</script>

<style lang="less">
.select {
    .content {
        gap: 5px;
        display: flex;
        flex-direction: column;
        position: relative;

        .item {
            height: 44px;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            z-index: 1;
            transition: background-color 0.3s ease;

            &:hover:not(.selected) {
                background-color: #f1f5f9;
            }
        }

        .selection-marker {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 44px;
            border-radius: 5px;
            background-color: var(--primary);
            transition: transform 0.3s ease;
            z-index: 0;
            pointer-events: none;
        }
    }
}

.category-item {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 10px;
    align-items: center;
    text-align: center;
    transition: 0.3s color ease;

    .u-icon {
        width: 24px;
        height: 24px;
    }
}
.selected .category-item {
    color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
