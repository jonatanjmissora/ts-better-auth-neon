import { createItemServer } from "server/items/create-item-server"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateItem(userId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createItemServer,
		onSuccess: () => {
			// invalidar items cache para refrescar list
			queryClient.invalidateQueries({ queryKey: ["items", userId] })
		},
	})
}
