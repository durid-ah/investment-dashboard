import { useState } from "react";
import { Ticker, useAddTickerMutation, useGetTickersQuery } from "../hooks/ticker-hooks";

type TickerDropDownProps = {
  onChange: (ticker: string) => void
}

export default function TickerDropdown({ onChange }: TickerDropDownProps) {
  const {data: tickers } = useGetTickersQuery()
  const mutation = useAddTickerMutation()
  const [selectedTicker, setSelectedTicker] = useState<string>('')
  const [filteredTickers, setFilteredTickers] = useState<Ticker[]>(filterTickers(tickers, selectedTicker))

  function filterTickers(tickers: Ticker[], targetTicker: string) {
    if (targetTicker) {
      const lowerTargetTicker = targetTicker.toLowerCase()
      return tickers.filter(t => t.ticker_name.toLowerCase().includes(lowerTargetTicker))    
    }
    else
      return tickers
  }

  function handleFilterChange(ticker: string) {
    const _ticker = ticker.toUpperCase()
    setFilteredTickers(filterTickers(tickers, ticker))
    setSelectedTicker(_ticker)
    onChange(_ticker)
  }
  
  async function addNewTicker(ticker:string) {
    mutation.mutate(ticker.toUpperCase())
  }

  return(
    <div className="dropdown dropdown-bottom">
      <input tabIndex={0} 
        type="text"
        className="input input-bordered input-xs w-full max-w-xs"
        value={selectedTicker}
        onChange={e => handleFilterChange(e.target.value)}/>
      <ul tabIndex={0} 
        className="dropdown-content menu neutral rounded-md z-[1] w-32 shadow overflow-hidden p-0">
        { selectedTicker && !tickers.find(t => t.ticker_name === selectedTicker) && 
          <li className="btn btn-neutral btn-xs rounded-none"
            onClick={() => addNewTicker(selectedTicker)}>
            Add Ticker
          </li>
        }
        { filteredTickers.map(t => (
          <li className="btn btn-neutral btn-xs rounded-none"
            key={t.ticker_name}
            onClick={() => handleFilterChange(t.ticker_name)}>
              {t.ticker_name}
          </li>
          )) 
        }
      </ul>
    </div>
  )
}