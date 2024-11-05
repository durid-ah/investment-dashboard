import { EditableValue } from "../components/editable-text"
import { Investment } from "./investment_calls"

type InvestmentProp = {
  investment: Investment,
  toggleSelect: (toggleIdx: number) => void
}

export function InvestmentRow({investment, toggleSelect}: InvestmentProp) {
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
        {/* TODO: We need an editable dropdown */}
        <div className="flex items-center gap-3">
          <div className="font-bold">{investment.ticker}</div>
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