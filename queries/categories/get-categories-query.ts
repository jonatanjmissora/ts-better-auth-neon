import { queryOptions } from "@tanstack/react-query"
import { getCategoriesServer } from "server/categories/get-categories-server"

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategoriesServer(),
	// no cambia casi nunca
	//refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})
