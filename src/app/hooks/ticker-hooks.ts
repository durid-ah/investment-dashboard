import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTicker } from "./ticker-call";
import { getTickers } from "./ticker-call";

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
