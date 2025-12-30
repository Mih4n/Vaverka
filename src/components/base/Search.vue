<script setup lang="ts">
import { ref } from 'vue';
import Icon from './Icon.vue';

const active = ref(false);
const model = defineModel<string>()
</script>

<template>
    <div 
        class="input search outline"
        :class="{ outlined: active }"
    >
        <Icon name="search" class="gray" />
        <input
            type="text"
            v-model="model"
            placeholder="Search..."
            @focus="active = true"
            @blur="active = false"
        />
    </div>
</template> 