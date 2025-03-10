'use client'

import { useSearchParams } from "next/navigation"
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useInvestmentsQuery } from "./investment-hooks";
import { InvestmentRow } from "./investment-row";
import { AddInvestmentRow } from "./add-investment-row";

const queryClient = new QueryClient()

export function InvestmentTable() {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountId = Number(searchParams.get('accountId'))
  const investments = useInvestmentsQuery(accountId)
  const internalQueryClient = useQueryClient()

  const toggleSelectAll = () => {
    const everyChecked = investments.data?.every(ac => ac.isSelected)
    let newInvestments = null

    if (everyChecked) {
      newInvestments = investments.data?.map(inv => ({ ...inv, isSelected: false}))
    } else {
      newInvestments = investments.data?.map(inv => ({ ...inv, isSelected: true}))
    }

    internalQueryClient.setQueryData(['investments', accountId], newInvestments)
  }

  return (
      <div className="overflow-x-auto h-full">
        <table className="table table-md">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={investments.data?.every(inv => inv.isSelected) ?? false }
                    onChange={() => toggleSelectAll()}/>
                </label>
              </th>
              <th>Ticker</th>
              <th>Category</th>
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
              <AddInvestmentRow accountId={accountId} cancelAddRow={() => null}/>
            }
            {
              investments.data?.map(investment => 
                (<InvestmentRow 
                  key={investment.id} 
                  investment={investment} />))
                }
          </tbody>
        </table>
      </div>
  ) 
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex h-full flex-col items-center justify-between p-24">
        <InvestmentTable/>
      </main>
    </QueryClientProvider>
  )
}