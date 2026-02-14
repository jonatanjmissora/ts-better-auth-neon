import { queryOptions, useQueryClient } from "@tanstack/react-query"
import { ItemWithCategoryType } from "db/schema"
import { getItemByIdServer } from "server/items/get-item-by-id-server"
import { getItemsServer } from "server/items/get-items-server"

export const itemsQueryOptions = queryOptions({
	queryKey: ["items"],
	queryFn: () => getItemsServer(),
	refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})

export const itemQueryOptions = (itemId: string) => {
	const queryClient = useQueryClient()
	return queryOptions({
		queryKey: ["item", itemId],

		queryFn: () => getItemByIdServer({ data: { itemId } }), // BACKUP

		initialData: () => {
			const items = queryClient.getQueryData<ItemWithCategoryType[]>(["items"])
			return items?.find(item => item.id === itemId)
		},
	})
}
