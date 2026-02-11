import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/schema"
import { deleteCategoryServer } from "server/categories/delete-category-server"

export function useDeleteCategory(categoryId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ data }: { data: { id: string } }) =>
			deleteCategoryServer({ data }),
		onSuccess: () => {
			queryClient.setQueryData<CategoryType[]>(
				["categories"],
				oldCategories => {
					if (!oldCategories) return oldCategories
					return oldCategories.filter(category => category.id !== categoryId)
				}
			)
		},
	})
}
