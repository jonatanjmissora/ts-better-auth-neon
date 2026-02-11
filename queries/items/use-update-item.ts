import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { ItemType, ItemWithCategoryType } from "db/schema"
import { updateItemServer } from "server/items/update-item-server"

type UpdateItemVariables = {
	data: ItemType
	category: CategoryType
}

export function useUpdateItem() {
	const queryClient = useQueryClient()

	return useMutation<ItemWithCategoryType, Error, UpdateItemVariables>({
		mutationFn: ({ data }: { data: ItemType }) => updateItemServer({ data }),
		onSuccess: (data, variables) => {
			queryClient.setQueryData<ItemWithCategoryType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				const oldItem = oldItems.find(
					oldItem => oldItem.id === variables.data.id
				)
				if (!oldItem) return oldItems
				return oldItems.map(oldItem =>
					oldItem.id === variables.data.id ? data : oldItem
				)
			})
			queryClient.setQueryData<ItemWithCategoryType>(
				["item", variables.data.id],
				data
			)
		},
	})
}
