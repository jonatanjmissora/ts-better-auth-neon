import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { CategoryFormType } from "db/categories/categories-validator"
import { createCategoryServer } from "server/categories/create-category-server"
import { sortByName } from "lib/utils"

type CreateCategoryVariables = {
	data: CategoryFormType
}

export function useCreateCategory() {
	const queryClient = useQueryClient()

	return useMutation<CategoryType, Error, CreateCategoryVariables>({
		mutationFn: ({ data }: { data: CategoryFormType }) =>
			createCategoryServer({ data }),
		onSuccess: async data => {
			queryClient.setQueryData<CategoryType[]>(
				["categories"],
				oldCategories => {
					if (!oldCategories) return oldCategories
					const newCategory = data
					const newCategories = sortByName([newCategory, ...oldCategories])
					return newCategories
				}
			)
		},
	})
}
