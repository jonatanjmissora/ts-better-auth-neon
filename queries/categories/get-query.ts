import { queryOptions } from "@tanstack/react-query"
import { getCategoriesFn } from "server/categories/get-categories"

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategoriesFn(),
})
