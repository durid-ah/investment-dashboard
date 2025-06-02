import { invoke } from "@tauri-apps/api";

export type Ticker = {
    ticker_name: string
}

export async function getTickers() {
    return await invoke<Ticker[]>('get_tickers');
}
  
export async function addTicker(ticker: string) {
    return await invoke('add_ticker', { newTicker: ticker })
}