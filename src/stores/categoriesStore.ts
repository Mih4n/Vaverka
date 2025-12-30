import { defineStore } from "pinia";
import { ref } from "vue";
import { Category } from "../models/Category";

export const useCategoriesStore = defineStore("categories", () => {
    const categories = ref<Category[]>([]);
    const selectedCategory = ref<Category>();

    const setCategories = (newCategories: Category[]) => {
        categories.value = newCategories;
    }

    const selectCategory = (category?: Category) => {
        selectedCategory.value = category;
    }

    return { 
        categories, 
        selectedCategory,
        setCategories,
        selectCategory
    };
});