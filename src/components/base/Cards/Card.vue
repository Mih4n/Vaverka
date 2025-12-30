<template>
        <div class="card">
        <div 
            class="icon"
            :style="{ backgroundColor: bgColor}"
        >
            <Icon :name="props.icon" :style="{ color: color }"/>
        </div>
        <div class="content">
            <h4>{{ props.title }}</h4>
            <h5 class="gray">{{ props.description }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon.vue';

const props = defineProps<{
    icon: string;
    color: string;
    title?: string;
    description?: string; 
}>();

const bgColor = computed(() => {
    if (props.color.startsWith('#')) {
        return `${props.color}1A`
    }

    if (props.color.startsWith('rgb(')) {
        return props.color.replace('rgb(', 'rgba(').replace(')', ', 0.1)')
    }

    return props.color
})
</script>

<style scoped lang="less">
.card {
    height: 150px;
    padding: 24px;
    overflow: hidden;

    .icon {
        width: 48px;
        height: 48px;

        padding: 10px;
        border-radius: 6px;

        background-color: var(--primary);
        transition: transform 0.3s ease;
    }
}

.card:hover,
.card.selected {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
    .icon {
        transform: scale(1.1);
    }
}
</style>