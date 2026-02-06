import { queryOptions } from "@tanstack/react-query"
import { getItemsServer } from "server/items/get-items-server"

export const useGetItems = (userId: string) => {
	return queryOptions({
		queryKey: ["items", userId],
		queryFn: () => getItemsServer(),
	})
}
