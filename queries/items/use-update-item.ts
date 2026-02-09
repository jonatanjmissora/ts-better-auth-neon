import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ResponseItemType } from "db/schema"

export function useUpdateItem(itemId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ data }: { data: ResponseItemType }) =>
			deleteItemServer({ data: { item } }),
		onSuccess: ({ variables }) => {
			queryClient.setQueryData<ResponseItemType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				const oldItem = oldItems.find(item => item.id === itemId)
				if (!oldItem) return oldItems
				return oldItems.map(item =>
					item.id === itemId ? variables.data : item
				)
			})
		},
	})
}
