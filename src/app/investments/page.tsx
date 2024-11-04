'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Investment, addInvestment, getInvestmentsByAccount } from "./investment_calls";
import TickerDropdown from "../components/ticker-dropdown";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditableValue } from "../components/editable-text";

type AddInvestmentRowProp = {
  accountId: number
  cancelAddRow: () => void
  addNewInvestment: (investment: Investment) => Promise<void> 
}

const queryClient = new QueryClient()

function AddInvestmentRow({ accountId, addNewInvestment, cancelAddRow }: AddInvestmentRowProp) {
  const [investment, setInvestment] = useState<Investment>(
    {
      id: 0, 
      account_id: accountId, 
      ticker: '', 
      shares: 0, 
      value: 0, 
      isSelected: false,
      category: ''
    });

  async function addFunction() {
    await addNewInvestment(investment!)
    setInvestment({
      id: 0, 
      account_id: accountId, 
      ticker: '', 
      shares: 0, 
      value: 0, 
      isSelected: false,
      category: ''
    });
  }

  return (
    <tr>
      <th></th>
      <td>
        <TickerDropdown onChange={(ticker) => setInvestment(inv => ({...inv, ticker}))} />
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

type InvestmentProp = {
  investment: Investment,
  toggleSelect: (toggleIdx: number) => void
}

function InvestmentRow({investment, toggleSelect}: InvestmentProp) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" 
            className="checkbox"
            checked={investment.isSelected}
            onChange={() => toggleSelect(investment.id)}/>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="font-bold">{investment.ticker}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <EditableValue content={investment.shares} 
            type="number" onChange={(value) => console.log(`Value`, value)}/>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <div>{investment.value}</div>
        </div>
      </td>
    </tr>
  )  
}

export default function Page() {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountId = Number(searchParams.get('accountId'))
  const [investments, setInvestments] = useState<Investment[]>([])

  useEffect(() => {
    getInvestmentsByAccount(accountId)
      .then(res => {
        res.forEach(inv => inv.isSelected = false)
        setInvestments(res) 
      }) 
  }, [accountId])

  async function addNewInvestment(investment: Investment) {
    await addInvestment(investment);
    getInvestmentsByAccount(accountId)
      .then(res => {
        res.forEach(inv => inv.isSelected = false)
        setInvestments(res) 
      }) 
  }

  function toggleSelectInvestment(investmentId: number) {
    const newInvestments = investments.map(inv => {
      if (inv.id === investmentId)
        inv.isSelected = !inv.isSelected

      return inv
    })
    
    setInvestments(newInvestments)
  }

  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <QueryClientProvider client={queryClient}>
      <div className="overflow-x-auto h-full">
        <table className="table table-md">
          <thead>
            <tr>
              <th>
                <label>
                  {/* TODO: Add Select All */}
                </label>
              </th>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Value</th>
              <th className="flex flex-col gap-2">
                <button className="btn btn-outline btn-primary btn-xs" onClick={() => setShowAdd(val => !val)}>add</button>
                <button className="btn btn-outline btn-error btn-xs">delete selected</button>
              </th>
            </tr>
          </thead>
          <tbody>
            { showAdd &&
              <AddInvestmentRow accountId={accountId} addNewInvestment={addNewInvestment} cancelAddRow={() => null}/>
            }
            {
              investments
              .map(investment => 
                (<InvestmentRow 
                  key={investment.id} 
                  investment={investment} 
                  toggleSelect={toggleSelectInvestment}/>))
                }
          </tbody>
        </table>
      </div>
      </QueryClientProvider>
    </main>    
  ) 
}