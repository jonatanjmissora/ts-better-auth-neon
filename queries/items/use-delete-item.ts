import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ResponseItemType } from "db/schema"

import { deleteItemServer } from "server/items/delete-item-server"

export function useDeleteItem(itemId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteItemServer({ data: { id: itemId } }),
		onSuccess: () => {
			queryClient.setQueryData<ResponseItemType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				return oldItems.filter(item => item.id !== itemId)
			})
		},
	})
}
