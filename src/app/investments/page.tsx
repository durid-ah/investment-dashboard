'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Investment, addInvestment, getInvestmentsByAccount } from "./investment_calls";

type AddInvestmentRowProp = {
  accountId: number
  cancelAddRow: () => void
  addNewInvestment: (investment: Investment) => Promise<void> 
}

function AddInvestmentRow({ accountId, addNewInvestment, cancelAddRow }: AddInvestmentRowProp) {
  const [investment, setInvestment] = useState<Investment>({id: 0, account_id: accountId, ticker: '', shares: 0, value: 0});
  async function addFunction() {
    await addNewInvestment(investment!)
    setInvestment({id: 0, account_id: accountId, ticker: '', shares: 0, value: 0});
  }

  return (
    <tr>
      <th></th>
      <td>
        <input type="text" 
          placeholder="ticker"
          value={investment.ticker}
          onChange={(e) => setInvestment(inv => ({...inv, ticker: e.target.value}))}
          minLength={3} maxLength={15} size={15} spellCheck={false}
          className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
      <td>
        <input type="number" 
          placeholder="shares" 
          onChange={(e) => setInvestment(inv => ({...inv, shares: Number(e.target.value) }))}
          className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
      <td>
        <input type="number" 
          placeholder="value"
          onChange={(e) => setInvestment(inv => ({...inv, value: Number(e.target.value)}))}
          className="input input-bordered input-xs w-full max-w-xs"/>
      </td>
      <th className="flex flex-row justify-center gap-2">
        <button 
            className="btn btn-outline btn-success btn-xs" 
            onClick={addFunction}> add </button>
        <button className="btn btn-outline btn-xs" onClick={cancelAddRow}>cancel</button>
      </th>
    </tr>
  )  
}


export default function Page() {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountId = Number(searchParams.get('accountId'))

  useEffect(() => {
    getInvestmentsByAccount(accountId).then(res => console.log(res)); 
  }, [accountId])

  async function addNewInvestment(investment: Investment) {
    await addInvestment(investment);
  }

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
              <th>Ticker</th>
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
              <AddInvestmentRow accountId={accountId} addNewInvestment={addNewInvestment} cancelAddRow={() => null}/>
            }
            {/* { accounts.map(ac => (
                <AccountRow key={`${ac.id}`} account={ac} toggleSelect={toggleSelectAccount} />
              ))
            */}
          </tbody>
        </table>
      </div>
    </main>    
  ) 
}