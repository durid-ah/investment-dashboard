'use client'

import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAccountsQuery, useAddAccountMutation, useDeleteAccountMutation } from './account-hooks';
import { AccountRow } from './account-row';

type AddAccountRowProp = {
  cancelAddRow: () => void
}

const queryClient = new QueryClient() 

function AddAccountRow({cancelAddRow}: AddAccountRowProp) {
  const [accountName, setAccountName] = useState('')
  const mutation = useAddAccountMutation()
  function addFunction() {
    mutation.mutate(accountName, {
      onSuccess: () => setAccountName('')
    })
  }

  return (
    <tr>
      <th></th>
      <td>
        <input type="text"
          onChange={(e) => setAccountName(e.target.value)} 
          placeholder="account name" 
          value={accountName}
          className="input input-bordered input-xs w-full max-w-xs" />
      </td>
      <th className="flex flex-row justify-center gap-2">
        <button 
            className="btn btn-outline btn-success btn-xs" 
            onClick={addFunction}> add </button>
        <button 
          className="btn btn-outline btn-xs" 
          onClick={cancelAddRow}>cancel</button>
      </th>
    </tr>
  )
}

function AccountTable() {
  const internalQueryClient = useQueryClient()
  const deleteAccountMutation = useDeleteAccountMutation()
  const accounts = useAccountsQuery()
  const [showAdd, setShowAdd] = useState<boolean>(false)

  const toggleSelectAll = () => {
    const everyChecked = accounts.data?.every(ac => ac.isSelected)
    let newAccts = null

    if (everyChecked) {
      newAccts = accounts.data?.map(ac => ({ ...ac, isSelected: false}))
    } else {
      newAccts = accounts.data?.map(ac => ({ ...ac, isSelected: true}))
    }

    internalQueryClient.setQueryData(['accounts'], newAccts)
  }

  function deleteSelectedAccounts() {
    accounts.data?.filter(ac => ac.isSelected)
      .map(ac => deleteAccountMutation.mutate(ac.id))
  }

  return (
    <div>
    <table className="table">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" 
                className="checkbox checkbox-primary"
                checked={accounts.data?.every(ac => ac.isSelected) ?? false}
                onChange={() => toggleSelectAll()}/>
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
        { showAdd && 
          <AddAccountRow cancelAddRow={() => setShowAdd(false)}/>
        }
        {
          accounts.data?.map(ac => (
            <AccountRow key={`${ac.id}`} account={ac} />
          ))
        }
      </tbody>
    </table>
  </div>)
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <AccountTable />
      </main>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}