import { queryOptions } from "@tanstack/react-query"
import { ResponseItemType } from "db/schema"
import { getQueryClient } from "queries/querie-client"
import { getItemByIdServer } from "server/items/get-item-by-id-server"
import { getItemsServer } from "server/items/get-items-server"

const queryClient = getQueryClient()

export const itemsQueryOptions = queryOptions({
	queryKey: ["items"],
	queryFn: () => getItemsServer(),
	refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})

export const itemQueryOptions = (itemId: string) =>
	queryOptions({
		queryKey: ["item", itemId],

		queryFn: () => getItemByIdServer({ data: { itemId } }), // BACKUP

		initialData: () => {
			const items = queryClient.getQueryData<ResponseItemType[]>(["items"])
			return items?.find(item => item.id === itemId)
		},
	})
