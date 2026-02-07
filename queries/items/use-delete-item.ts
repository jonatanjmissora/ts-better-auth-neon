import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteItemServer } from "server/items/delete-item-server"

export function useDeleteItem(itemId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteItemServer({ data: { id: itemId } }),
		onSuccess: () => {
			// invalidar items cache para refrescar list
			queryClient.invalidateQueries({ queryKey: ["items"] })
		},
	})
}
