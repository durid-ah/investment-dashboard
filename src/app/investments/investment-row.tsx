import { useQueryClient } from "@tanstack/react-query"
import { EditableValue } from "../components/editable-text"
import { Investment } from "../backend-calls/investment-calls"
import { EditableTicker } from "../components/editable-ticker"
import { useUpdateInvestmentMutation } from "../hooks/investment-hooks"

type InvestmentProp = {
  investment: Investment
}

export function InvestmentRow({investment}: InvestmentProp) {
  const internalQueryClient = useQueryClient()
  const mutation = useUpdateInvestmentMutation(investment.account_id)

  const toggleSelect = (investmentId: number) => {
    internalQueryClient.setQueryData(['investments', investment.account_id], (oldInvestments: Investment[]) => {
      const targetIdx = oldInvestments.findIndex(inv => inv.id === investmentId)
      const newInvestments = [...oldInvestments]
      newInvestments[targetIdx] = {
        ...newInvestments[targetIdx],
        isSelected: !newInvestments[targetIdx].isSelected
      }

      return newInvestments
    })
  }

  function updateTicker(ticker: string) {
    mutation.mutate({...investment, ticker}, 
      { 
        onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['investments', investment.account_id]}),
        onError: (err) => console.error(err)
      })
  }

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
        {/* TODO: Handle persistence */}
        <div className="flex items-center gap-3">
          <EditableTicker 
            content={investment.ticker} 
            onTickerSelected={(value) => updateTicker(value!.toString())}/>
        </div>
      </td>
      <td>
        {/* TODO: We need an editable dropdown */}
      <div className="flex items-center gap-3">
          <div className="font-bold">{investment.category}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          {/* TODO: Persistence is needed */}
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