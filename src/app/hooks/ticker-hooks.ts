import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTicker } from "../backend-calls/ticker-calls";
import { getTickers } from "../backend-calls/ticker-calls";


export type Ticker = {
    ticker_name: string
}

export const useGetTickersQuery = () => {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: getTickers,
        initialData: []
    })
}

export const useAddTickerMutation = () => {
    const internalQueryClient = useQueryClient()
    return useMutation({
        mutationFn: addTicker,
        onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['tickers']})
    })
}
