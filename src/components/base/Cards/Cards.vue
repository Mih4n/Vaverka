<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Card from './Card.vue';
const props = defineProps<{
    models: T[];
    toCard: (entity: T) => {
        icon: string;
        color: string;
        title: string;
        description: string;
    };
}>();

const model = defineModel<T>();
const cards = computed(() => 
    props.models.map(model => {
        return {
            ...props.toCard(model),
            model: model
        }
    })
);
const isSelected = (cardModel: T) => {
    return model.value === cardModel;
}
</script>

<template>
    <div class="cards">
        <Card 
            v-for="(card, i) in cards" :key="i" 
            :class="{ selected: isSelected(card.model) }"
            :icon="card.icon"
            :color="card.color"
            :title="card.title"
            :description="card.description"
            @click="() => model = card.model"
        />
    </div>
</template>

<style scoped lang="less">
.cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 15px;
}

@media (max-width: 1200px) {
    .cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>