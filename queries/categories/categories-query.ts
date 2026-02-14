import { queryOptions, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { getCategoriesServer } from "server/categories/get-categories-server"
import { getCategoryByIdServer } from "server/categories/get-category-by-id-server"

export const categoriesQueryOptions = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategoriesServer(),
	refetchInterval: 60 * 1000, // refrescar cada 60 segundos
})

export const categoryQueryOptions = (categoryId: string) => {
	const queryClient = useQueryClient()
	return queryOptions({
		queryKey: ["category", categoryId],

		queryFn: () => getCategoryByIdServer({ data: { categoryId } }), // BACKUP

		initialData: () => {
			const categories = queryClient.getQueryData<CategoryType[]>([
				"categories",
			])
			return categories?.find(category => category.id === categoryId)
		},
	})
}
