import { queryOptions } from "@tanstack/react-query"
import { getCategoriesServer } from "server/categories/get-categories-server"

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategoriesServer(),
})
