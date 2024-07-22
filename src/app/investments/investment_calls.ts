import { invoke } from "@tauri-apps/api/tauri"


export type Investment = {
    id: number,
    account_id: number,
    ticker: string,
    shares: number,
    value: number
}

export async function getInvestmentsByAccount(accountId: number) {
    return await invoke<Investment[]>('get_investments_by_account', {accountId: accountId});
}

export async function addInvestment(investment: Investment) {
    return await invoke('add_investment', {investment: investment})
}