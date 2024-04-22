'use client'

import { useEffect, useState } from 'react';
import { Account, addAccount, deleteAccount, getAccounts } from './account_calls';


type AddAccountRowProp = {
  cancelAddRow: () => void
  addNewAccount: (name: string) => void 
}

function AddAccountRow({cancelAddRow, addNewAccount}: AddAccountRowProp) {
  const [accountName, setAccountName] = useState('')

  return (
    <tr>
      <th></th>
      <td>
        <input type="text"
          onChange={(e) => setAccountName(e.target.value)} 
          placeholder="account name" 
          className="input input-bordered input-xs w-full max-w-xs" />
      </td>
      <th className="flex flex-row justify-center gap-2">
        <button 
            className="btn btn-outline btn-success btn-xs" 
            onClick={() => addNewAccount(accountName)}> add </button>
        <button className="btn btn-outline btn-xs" onClick={cancelAddRow}>cancel</button>
      </th>
    </tr>
  )
}

type AccountProp = {
  account: Account,
  toggleSelect: (toggleIdx: number) => void
}

function AccountRow({account, toggleSelect} : AccountProp) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" 
            className="checkbox" 
            checked={account.isSelected}
            onChange={() => toggleSelect(account.id)}/>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="font-bold">{account.account}</div>
        </div>
      </td>
      <th className="flex flex-row justify-center">
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  )
}

export default function Page() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
      
  useEffect(() => {
    getAccounts()
      .then((res: Account[]) => {
        res.forEach(ac => ac.isSelected = false)
        setAccounts(res)
      })
  }, [])

  function turnOffAddAccount() {
    setShowAdd(false)
  }

  function toggleSelectAccount(accountId: number) {
    const newAccts = accounts.map(ac => {
      if (ac.id === accountId)
        ac.isSelected = !ac.isSelected
      return ac
    })
    setAccounts(newAccts)
  }

  async function addNewAccount(accountName: string) {
    if (accountName.length === 0) return

    await addAccount(accountName)
    getAccounts()
      .then((res: Account[]) => {
        res.forEach(ac => ac.isSelected = false)
        setAccounts(res)
      })
  }

  async function deleteSelectedAccounts() {
    const acctPromises = accounts.filter(ac => ac.isSelected)
      .map(ac => deleteAccount(ac.id))
    await Promise.all(acctPromises)
    const remainingAccts = accounts.filter(ac => !ac.isSelected)
    setAccounts(remainingAccts)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                </label>
              </th>
              <th>Account Name</th>
              <th className="flex flex-row gap-2">
                <button className="btn btn-outline btn-primary btn-xs" onClick={() => setShowAdd(val => !val)}>add account</button>
                <button className="btn btn-outline btn-error btn-xs" onClick={deleteSelectedAccounts}>delete selected</button>
              </th>
            </tr>
          </thead>
          <tbody>
            { accounts.map(ac => (
                <AccountRow key={`${ac.id}`} account={ac} toggleSelect={toggleSelectAccount} />
              ))
            }    
            { showAdd && 
              <AddAccountRow 
                  cancelAddRow={turnOffAddAccount} 
                  addNewAccount={addNewAccount}/>
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}