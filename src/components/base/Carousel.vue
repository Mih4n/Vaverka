<template>
    <div class="carousel">
        <div
            class="track"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
            <div
                v-for="(item, index) in items"
                :key="index"
                class="item"
            >
                <slot :item="item" name="item" :key="`item-${index}`" />
            </div>
        </div>

        <div class="controls">
            <button @click="prev">
                <Icon name="prev" />
            </button>
            <button @click="next">
                <Icon name="next" />
            </button>
        </div>

        <div class="pagination">
            <span
                v-for="(_, index) in items"
                :key="index"
                :class="{ active: index === currentIndex }"
                @click="goTo(index)"
            />
        </div>  
    </div>
</template>

<script setup lang="ts" generic="T">
import { onMounted, ref } from 'vue'
import Icon from './Icon.vue';

let interval: number
const props = defineProps<{
    items: T[];
    autoplay?: boolean
}>()
const currentIndex = ref(0)

function next() {
    console.log(props.items)
    console.log(currentIndex.value);
    currentIndex.value = (currentIndex.value + 1) % props.items.length
    console.log(currentIndex.value);
}

function prev() {
    console.log(currentIndex.value);
    currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
    console.log(currentIndex.value);
}

function goTo(index: number) {
    currentIndex.value = index
}

onMounted(() => {
    interval = setInterval(next, 3000)
})
</script>

<style lang="less">
.carousel {
    margin-top: 20px;
    width: 100%;
    min-height: 270px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    background-color: var(--primary);

    display: flex;
    flex-direction: column;

    .track {
        flex: 1;
        width: 100%;
        display: flex;
        min-height: 100%;
        transition: transform 0.4s ease;
    }

    .item {
        flex: 0 0 100%
    }

    .controls {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;

        button {
            padding: 8px;
            pointer-events: all;
            background: rgba(255, 255, 255, 0.4);
            border: none;
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            margin: 0 10px;
        }
    }

    .pagination {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;

        span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;

            &.active {
                background: #fff;
                width: 30px;
                border-radius: 5px;
            }
        }
    }
}
</style>
