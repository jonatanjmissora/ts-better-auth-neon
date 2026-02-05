import { createItem } from "server/items/create-item"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "queries/querie-client"

export function useCreateItem(userId: string) {
	const queryClient = getQueryClient()

	return useMutation({
		mutationFn: createItem,
		onSuccess: () => {
			// invalidar items cache para refrescar list
			queryClient.invalidateQueries({ queryKey: ["items", userId] })
		},
	})
}
