import { queryOptions } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { getQueryClient } from "queries/querie-client"
import { getCategoriesServer } from "server/categories/get-categories-server"
import { getCategoryByIdServer } from "server/categories/get-category-by-id-server"

const queryClient = getQueryClient()

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategoriesServer(),
	refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})

export const categoryQueryOptions = (categoryId: string) =>
	queryOptions({
		queryKey: ["category", categoryId],

		queryFn: () => getCategoryByIdServer({ data: { categoryId } }), // BACKUP

		initialData: () => {
			const categories = queryClient.getQueryData<CategoryType[]>([
				"categories",
			])
			return categories?.find(category => category.id === categoryId)
		},
	})
