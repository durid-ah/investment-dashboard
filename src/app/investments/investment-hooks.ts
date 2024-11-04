import { useQuery } from "@tanstack/react-query";
import { getInvestmentsByAccount } from "./investment_calls";

export const useInvestmentsQuery = (accountId: number) => useQuery({
    queryKey: ['investments', accountId ],
    initialData: [],
    queryFn: () => getInvestmentsByAccount(accountId)
        .then(res => res.map(r => {
            r.isSelected = false
            return r
        })),
})
