import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { sortByName } from "lib/utils"
import { updateCategoryServer } from "server/categories/update-category-server"

type UpdateCategoryVariables = {
	data: CategoryType
}

export function useUpdateCategory() {
	const queryClient = useQueryClient()

	return useMutation<CategoryType, Error, UpdateCategoryVariables>({
		mutationFn: ({ data }: { data: CategoryType }) =>
			updateCategoryServer({ data }),
		onSuccess: (data, variables) => {
			queryClient.setQueryData<CategoryType[]>(
				["categories"],
				oldCategories => {
					if (!oldCategories) return oldCategories
					const oldCategory = oldCategories.find(
						element => element.id === variables.data.id
					)
					if (!oldCategory) return oldCategories
					return sortByName(
						oldCategories.map(element =>
							element.id === variables.data.id ? data : element
						)
					)
				}
			)
			queryClient.setQueryData<CategoryType>(["category", data.id], data)
		},
	})
}
