import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAccount, deleteAccount, getAccounts, updateAccount } from "../backend-calls/account-calls";

export const useAccountsQuery = () => useQuery({
    queryKey: ['accounts'],
    initialData: [],
    queryFn: () => getAccounts().then(res => res.map(ac => {
        if (!ac.isSelected)
            ac.isSelected = false

        return ac
    })),
})

export const useDeleteAccountMutation = () => {
  const internalQueryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      return internalQueryClient.invalidateQueries({queryKey: ['accounts']})
    }
  })
}

export const useAddAccountMutation = () => {
  const internalQueryClient = useQueryClient()
  return useMutation({
    mutationFn: (accountName: string) => addAccount(accountName),
    onSuccess: () => {
      return internalQueryClient.invalidateQueries({queryKey: ['accounts']})
    }
  })
}

export const useUpdateAccountMutation = () => {
  const internalQueryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['accounts']})
  })
}