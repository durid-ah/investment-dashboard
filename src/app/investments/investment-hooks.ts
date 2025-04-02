import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addInvestment, getInvestmentsByAccount, updateInvestment } from "./investment_calls";

export const useInvestmentsQuery = (accountId: number) => useQuery({
    queryKey: ['investments', accountId ],
    initialData: [],
    queryFn: () => getInvestmentsByAccount(accountId)
        .then(res => res.map(r => {
            r.isSelected = false
            return r
        })),
})

export const useAddInvestmentMutation = (accountId: number) => {
    const internalQueryClient = useQueryClient()
    return useMutation({
        mutationFn: addInvestment,
        onSuccess: () => internalQueryClient
            .invalidateQueries({queryKey: ['investments', accountId]}) 
    })
}

export const useUpdateInvestmentMutation = (accountId: number) => {
  const internalQueryClient = useQueryClient()
  return useMutation({
    mutationFn: updateInvestment,
    onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['investments', accountId]})
  })
}

// TODO: Delete investment command