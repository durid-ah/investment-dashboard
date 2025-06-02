import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getCategories } from "../backend-calls/investment-category-calls";

export const useGetCategoriesQuery = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        initialData: []
    })
}

export const useAddCategoryMutation = () => {
    const internalQueryClient = useQueryClient()
    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => internalQueryClient.invalidateQueries({queryKey: ['categories']})
    })
}
