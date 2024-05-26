'use client'

import { useSearchParams } from "next/navigation"
import { useState } from "react";

function AddInvestmentRow() {
  return (
    <tr>
      <th></th>
      <td>
        <input type="text" 
          placeholder="ticker"
          minLength={3}
          maxLength={15}
          size={15}
          spellCheck={false}
          className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
      <td>
        <input type="number" placeholder="shares" className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
      <td>
        <input type="number" placeholder="value" className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
    </tr>
  )  
}


export default function Page() {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountId = searchParams.get('accountId')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>
                <label>
                </label>
              </th>
              <th className="">Ticker</th>
              <th>Shares</th>
              <th>Value</th>
              <th className="flex flex-row gap-2">
                <button className="btn btn-outline btn-primary btn-xs" onClick={() => setShowAdd(val => !val)}>add investmet</button>
                <button className="btn btn-outline btn-error btn-xs">delete selected</button>
              </th>
            </tr>
          </thead>
          <tbody>
            { showAdd &&
              <AddInvestmentRow />
            }
            {/* { accounts.map(ac => (
                <AccountRow key={`${ac.id}`} account={ac} toggleSelect={toggleSelectAccount} />
              ))
            }    
            { showAdd && 
              <AddAccountRow 
                  cancelAddRow={turnOffAddAccount} 
                  addNewAccount={addNewAccount}/>
            } */}
          </tbody>
        </table>
      </div>
    </main>    
  ) 
}