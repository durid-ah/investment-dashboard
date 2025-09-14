import { invoke } from "@tauri-apps/api/core";

export type InvestmentCategory = {
    category: string
}

export async function getCategories() {
    return await invoke<InvestmentCategory[]>('get_categories');
}

export async function addCategory(category: string) {
    return await invoke('add_category', { newCategory: category })
}