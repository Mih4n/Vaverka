<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Icon from './Icon.vue';
import Search from './Search.vue';
import { useGoodsStore } from '../../stores/goodsStore';
import { useCartStore } from '../../stores/CartStore';
import { ref, watch } from 'vue';

const { open } = storeToRefs(useCartStore())
const { search } = storeToRefs(useGoodsStore())

const header = ref<HTMLElement>(); 

const updateHeaderWidth = () => {
    if (!header.value) return
    const height = header.value.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
    );
};

watch(header, () => updateHeaderWidth())
</script>

<template>
    <header ref="header">
        <div class="wrapper">
            <div class="logo">
                <div class="square">
                    
                </div>
                <div class="label">
                    <h3 class="primary">Ваверка</h3>
                    <h5 class="gray">Беларусь носит своё</h5>
                </div>
            </div>
            <Search class="desktop" v-model="search" />
            <div class="user-info">
                <Icon name="user" class="black" />
                <Icon name="shoppingCart" class="black" @click="() => open = !open"/>
            </div>
        </div>
        <Search class="mobile" />
    </header>
</template>

<style lang="less" scoped>
header {
    top: 0px;
    position: sticky;
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px var(--page-margin);
    background-color: white;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);

    .search {
        width: 100%;
    }

    .wrapper {
        display: flex;
        justify-content: center;

        .search.desktop {
            width: 400px;
            margin: auto;
        }

        .logo,
        .user-info {
            flex: 1;
        }
        .logo {
            gap: 10px;
            display: flex; 
            .square {
                width: 40px;
                height: 40px;

                border-radius: 10px;

                background-color: var(--primary);
            }
            .label {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }

        .user-info {
            gap: 20px;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .u-icon {
                width: 24px;
                height: 24px;
            }
        }

    }
}

@media (max-width: 1200px) {
    .search.desktop {
        display: none;
    }    
}
@media (min-width: 1200px) {
    .search.mobile {
        display: none;
    }    
}
</style>