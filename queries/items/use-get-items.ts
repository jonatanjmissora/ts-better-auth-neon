import { queryOptions } from "@tanstack/react-query"
import { getItemsServer } from "server/items/get-items-server"

export const useGetItems = (userId: string) => {
	return queryOptions({
		queryKey: ["items", userId],
		queryFn: () => getItemsServer(),
		refetchInterval: 60 * 1000, // refrescar cada 60 segundos
	})
}
