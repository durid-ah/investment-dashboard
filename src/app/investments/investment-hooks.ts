import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addInvestment, deleteInvestment, getInvestmentsByAccount, updateInvestment } from "./investment-calls";

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

export const useDeleteInvestmentMutation = (accountId: number) => {
    const internalQueryClient = useQueryClient()
    return useMutation({
        mutationFn: (investmentId: number) => deleteInvestment(investmentId, accountId),
        onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['investments', accountId]})
    })
}
