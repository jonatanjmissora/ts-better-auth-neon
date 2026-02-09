import { queryOptions } from "@tanstack/react-query"
import { getItemsServer } from "server/items/get-items-server"

export const itemsQueryOptions = queryOptions({
	queryKey: ["items"],
	queryFn: () => getItemsServer(),
	refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})

export const itemQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["item", id],

		queryFn: () => getItemByIdServer(id), // BACKUP

		initialData: () => {
			const items = queryClient.getQueryData<Item[]>(["items"])
			return items?.find(item => item.id === id)
		},
	})
