import { createItemServer } from "server/items/create-item-server"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "queries/querie-client"

export function useCreateItem(userId: string) {
	const queryClient = getQueryClient()

	return useMutation({
		mutationFn: createItemServer,
		onSuccess: () => {
			// invalidar items cache para refrescar list
			queryClient.invalidateQueries({ queryKey: ["items", userId] })
		},
	})
}
