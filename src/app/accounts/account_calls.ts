import { invoke } from '@tauri-apps/api/tauri'

export type Account = {
  id: number,
  account_name: string,
  isSelected: boolean
}

export async function getAccounts() {
  return await invoke<Account[]>('get_accounts')

}
      
export async function deleteAccount(accountId: number) {
  await invoke('delete_account', {idToDelete: accountId})
}

export async function addAccount(accountName: string) {
  await invoke('add_account', {accountName})
}