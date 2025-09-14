import { useRef, useState } from "react";
import { useAddTickerMutation, useGetTickersQuery } from "../hooks/ticker-hooks";
import { Ticker } from "../backend-calls/ticker-calls";

type TickerDropDownProps = {
  initialValue?: string
  onBlur?: () => void
  onTickerSelected?: (ticker: string) => void
}

export default function TickerDropdown({ initialValue, onBlur, onTickerSelected }: TickerDropDownProps) {
  const {data: tickers } = useGetTickersQuery()
  const mutation = useAddTickerMutation()

  const [selectedTicker, setSelectedTicker] = useState<string>(initialValue ?? '')
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
    console.log('TickerDropdown', `handleFilterChange`, ticker)
    const _ticker = ticker.toUpperCase()
    setFilteredTickers(filterTickers(tickers, ticker))
    setSelectedTicker(_ticker)
  }

  function handleTickerSelected(ticker: string) {
    onTickerSelected?.(ticker)
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log('TickerDropdown', `handleKeyPress`, selectedTicker, e.code)
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleTickerSelected(selectedTicker)
      e.currentTarget.blur()
    } else if (e.code === 'Escape') {
      setSelectedTicker(prev => initialValue ?? prev)
      handleTickerSelected(initialValue ?? selectedTicker)
      e.currentTarget.blur()
    }
  }
  
  async function addNewTicker(ticker:string) {
    mutation.mutate(ticker.toUpperCase())
    setSelectedTicker(ticker.toUpperCase())
    handleTickerSelected(ticker.toUpperCase())
    onBlur?.()
  }

  return(
    <div className="dropdown dropdown-bottom" onBlur={onBlur}>
      <input tabIndex={0} 
        type="text"
        className="input input-bordered input-xs w-full max-w-xs"
        value={selectedTicker}
        onKeyDown={handleKeyPress}
        onChange={e => handleFilterChange(e.target.value)}/>
      <ul tabIndex={0}
        className="dropdown-content menu neutral rounded-md z-[1] w-32 shadow overflow-hidden p-0">
        { selectedTicker && !tickers.find(t => t.ticker_name === selectedTicker) && 
          <li className="btn btn-neutral btn-xs rounded-none"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => addNewTicker(selectedTicker)}>
            Add Ticker
          </li>
        }
        {/* TODO: arrow buttons to select the ticker */}
        { filteredTickers.map(t => (
          <li className="btn btn-neutral btn-xs rounded-none"
            key={t.ticker_name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              handleFilterChange(t.ticker_name)
              handleTickerSelected(t.ticker_name)
              onBlur?.()
            }}>
              {t.ticker_name}
          </li>
          )) 
        }
      </ul>
    </div>
  )
}