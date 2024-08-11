import { invoke } from "@tauri-apps/api"
import { useEffect, useState } from "react";

type Ticker = {
  ticker_name: string
}

type TickerDropDownProps = {
  onChange: (ticker: string) => void
}

async function getTickers() {
  return await invoke<Ticker[]>('get_tickers');
}

async function addTicker(ticker: string) {
  return await invoke('add_ticker', { newTicker: ticker })
}

export default function TickerDropdown({ onChange }: TickerDropDownProps) {
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [filteredTickers, setFilteredTickers] = useState<Ticker[]>([])
  const [selectedTicker, setSelectedTicker] = useState<string>('')

  useEffect(() => {
    getTickers()
      .then(res => {
        setTickers(res)
        setFilteredTickers(filterTickers(res, selectedTicker))
      })
  }, [])

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
    await addTicker(ticker.toUpperCase())
    const _tickers = await getTickers()
    setTickers(_tickers)
    setFilteredTickers(filterTickers(_tickers, selectedTicker))
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
        { selectedTicker && 
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