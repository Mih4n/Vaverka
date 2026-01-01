import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { SortOption } from "../models/SortOptions";
import { getActualPrice, Product } from "../models/Product";
import _ from "lodash";
import { AttributeType } from "../models/AttributeType";
import { useCategoriesStore } from "./categoriesStore";

export const useGoodsStore = defineStore('goods', () => {
    const sort = ref<SortOption>()
    const goods = ref<Product[]>([])
    const search = ref<string>()
    const selectedSizes = ref<number[]>()
    const selectedMaterials = ref<string[]>()

    const priceRange = computed(() => {
        if (goods.value.length === 0) {
            return { min: 0, max: 0 }
        }
        const prices = goods.value.map(g => g.price)

        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        }
    })
    const priceFromTo = ref(priceRange.value)

    const setGoods = (products: Product[]) => {
        goods.value = products;
    }

    const MIN_VOTES = 10

    function weightedScore(x: Product) {
        return (x.score * x.scored) / (x.scored + MIN_VOTES)
    }

    const firstFilteredGoods = computed(() => {
        let result = goods.value.slice()
        const categoryId = useCategoriesStore().selectedCategory?.id

        result = result.filter(g => g.price >= priceFromTo.value.min && g.price <= priceFromTo.value.max)
        const lookup = search.value?.trim()
        if (lookup)
            result = result.filter(g => g.name.indexOf(lookup))
        
        if (categoryId)
            result = result.filter(g => g.categoriesIds.includes(categoryId))

        if (sort.value == SortOption.CostUp)
            result = _.orderBy(result, [ x => getActualPrice(x) ], [ 'asc' ])
        if (sort.value == SortOption.CostDown)
            result = _.orderBy(result, [ x => getActualPrice(x) ], [ 'desc' ])
        if (sort.value === SortOption.New) {
            result = _.orderBy(
                result,
                [x => x.attributes?.some(a => a.type === AttributeType.New) ? 0 : 1],
                ['asc']
            )
        }
        if (sort.value === SortOption.Popularity) {
            result = _.orderBy(
                result,
                [x => x.attributes?.some(a => a.type === AttributeType.Popular) ? 0 : 1],
                ['asc']
            )
        }
        if (sort.value === SortOption.Score) {
            result.sort((a, b) => weightedScore(b) - weightedScore(a))
        }

        return result
    })

    const materials = computed(() => {
        return [...new Set(
            firstFilteredGoods.value.flatMap(g => g.materials)
        )]
    })

    const sizes = computed(() => {
        const result =  [...new Set(
            firstFilteredGoods.value.flatMap(g => g.sizes)
        )]
        result.sort((a, b) => a - b)
        return result
    })

    const filteredGoods = computed(() => {
        const sizes = new Set(selectedSizes.value ?? [])
        const materials = new Set(selectedMaterials.value ?? [])

        return firstFilteredGoods.value.filter(g => {
            const sizeMatch = sizes.size === 0 || g.sizes.some(s => sizes.has(s))
            const materialMatch = materials.size === 0 || g.materials.some(m => materials.has(m))

            return sizeMatch && materialMatch
        })
    })


    watch(priceRange, () => {
        priceFromTo.value.max = priceRange.value.max,
        priceFromTo.value.min = priceRange.value.min
    })

    return {
        sort,
        goods,
        sizes,
        search,
        selectedSizes,
        materials,
        filteredGoods,
        priceRange,
        priceFromTo,
        selectedMaterials,

        setGoods
    }
})