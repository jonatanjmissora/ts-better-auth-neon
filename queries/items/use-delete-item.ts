import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ItemWithCategoryType } from "db/schema"
import { deleteItemServer } from "server/items/delete-item-server"

export function useDeleteItem(itemId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ data }: { data: { id: string } }) =>
			deleteItemServer({ data }),
		onSuccess: () => {
			queryClient.setQueryData<ItemWithCategoryType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				return oldItems.filter(item => item.id !== itemId)
			})
		},
	})
}
