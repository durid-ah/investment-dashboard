import { useQueryClient } from "@tanstack/react-query"
import { EditableValue } from "../components/editable-text"
import { Investment } from "../backend-calls/investment-calls"
import { EditableTicker } from "../components/editable-ticker"
import { useUpdateInvestmentMutation } from "../hooks/investment-hooks"
import { EditableCategory } from "../components/editable-category"

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

  function updateInvestment(updatedInvestment: any) {
    mutation.mutate({...investment, ...updatedInvestment}, 
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
        <div className="flex items-center gap-3">
          <EditableTicker 
            content={investment.ticker} 
            onTickerSelected={(value) => updateInvestment({ ticker: value!.toString()})}/>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <EditableCategory 
            content={investment.category} 
            onCategorySelected={(value) => updateInvestment({ category: value!.toString()})}/>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <EditableValue content={investment.shares} 
            type="number" onChange={(value) => updateInvestment({ shares: value })}/>
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