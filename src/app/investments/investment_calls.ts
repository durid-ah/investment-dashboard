import { invoke } from "@tauri-apps/api/tauri"


export type Investment = {
    id: number,
    account_id: number,
    ticker: string,
    shares: number,
    value: number,
    category: string,
    isSelected: boolean
}

export async function getInvestmentsByAccount(accountId: number) {
    return await invoke<Investment[]>('get_investments_by_account', {filterAccountId: accountId});
}

export async function addInvestment(investment: Investment) {
    return await invoke('add_investment', {newInvestment: investment})
}

export async function updateInvestment(investment: Investment) {
    return await invoke('update_investment', {investmentUpdate: investment})
}

// TODO: Delete investments commands