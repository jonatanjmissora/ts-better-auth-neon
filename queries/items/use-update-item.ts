import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ItemType, ItemWithCategoryType } from "db/schema"
import { updateItemServer } from "server/items/update-item-server"

export function useUpdateItem(item: ItemType) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateItemServer,
		onSuccess: ({ data, variables }) => {
			queryClient.setQueryData<ItemWithCategoryType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				const oldItem = oldItems.find(item => item.id === itemId)
				if (!oldItem) return oldItems
				return oldItems.map(item => (item.id === itemId ? data : item))
			})
		},
	})
}
