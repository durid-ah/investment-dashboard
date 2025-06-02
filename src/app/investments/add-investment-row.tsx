import { useState } from "react"
import { useAddInvestmentMutation } from "./investment-hooks"
import TickerDropdown from "../components/ticker-dropdown"
import { Investment } from "./investment-calls"

type AddInvestmentRowProp = {
    accountId: number
    cancelAddRow: () => void
}
  
export function AddInvestmentRow({ accountId, cancelAddRow }: AddInvestmentRowProp) {
    const mutation = useAddInvestmentMutation(accountId)
    const [investment, setInvestment] = useState<Investment>(
    {
        id: 0, 
        account_id: accountId, 
        ticker: '', 
        shares: 0, 
        value: 0, 
        isSelected: false,
        category: ''
    })

    function addFunction() {
        mutation.mutate(investment!, {
        onSuccess: () => setInvestment({
            id: 0, account_id: accountId, 
            ticker: '', shares: 0, value: 0, 
            isSelected: false, category: '' 
            }),
        onError: (err) => console.error(err)
        })
    }

    return (
        <tr>
        <th></th>
        <td>
            <TickerDropdown onChange={(ticker) => setInvestment(inv => ({...inv, ticker}))} />
        </td>
        <td>
            {/** TODO: CHANGE THIS TO DROPDOWN ALSO CREATE DROPDOWN */}
            <input type="text" 
            placeholder="category"
            onChange={(e) => setInvestment(inv => ({...inv, category: e.target.value}))}
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
  