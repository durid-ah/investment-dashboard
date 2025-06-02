import { invoke } from "@tauri-apps/api";
import { Ticker } from "./ticker-hooks";

export async function getTickers() {
    return await invoke<Ticker[]>('get_tickers');
}
  
export async function addTicker(ticker: string) {
    return await invoke('add_ticker', { newTicker: ticker })
}