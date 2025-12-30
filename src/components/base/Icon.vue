<template>
    <div class="u-icon">
        <component :is="icon" />
    </div>
</template>

<script setup lang="ts">
    import user from '../../assets/svg/icons/user.svg'
    import next from '../../assets/svg/icons/next.svg'
    import prev from '../../assets/svg/icons/prev.svg'
    import star from '../../assets/svg/icons/star.svg'
    import bulb from '../../assets/svg/icons/bulb.svg'
    import cross from '../../assets/svg/icons/cross.svg'
    import party from '../../assets/svg/icons/party.svg'
    import search from '../../assets/svg/icons/search.svg'
    import arrowUp from '../../assets/svg/icons/arrowUp.svg'
    import arrowDown from '../../assets/svg/icons/arrowDown.svg'
    import shoppingCart from '../../assets/svg/icons/shopping-cart.svg'
    
    const icons = {
        user: user,
        next: next,
        prev: prev,
        star: star,
        bulb: bulb,
        cross: cross,
        party: party,
        search: search,
        arrowUp: arrowUp,
        arrowDown: arrowDown,
        shoppingCart: shoppingCart,
    }
    const props = defineProps<{
        name: keyof typeof icons | string
    }>()
    //@ts-ignore
    const icon = icons[props.name]
</script>

<style lang="less">
.u-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 100%;
        height: 100%;
        color: inherit;
    }
}
</style>