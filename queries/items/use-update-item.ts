import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryType } from "db/categories/schema"
import { ItemType, ItemWithCategoryType } from "db/schema"
import { setItemForQuery, sortByDate } from "lib/utils"
import { updateItemServer } from "server/items/update-item-server"

type UpdateItemVariables = {
	data: ItemType
	category: CategoryType
}

export function useUpdateItem() {
	const queryClient = useQueryClient()

	return useMutation<ItemType, Error, UpdateItemVariables>({
		mutationFn: ({ data }: { data: ItemType }) => updateItemServer({ data }),
		onSuccess: (data, variables) => {
			if (!data || !variables) return
			const updatedItem = setItemForQuery(data, variables.category)
			queryClient.setQueryData<ItemWithCategoryType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				const oldItem = oldItems.find(
					oldItem => oldItem.id === variables.data.id
				)
				if (!oldItem) return oldItems
				return sortByDate(
					oldItems.map(oldItem =>
						oldItem.id === variables.data.id ? updatedItem : oldItem
					)
				)
			})
			queryClient.setQueryData<ItemWithCategoryType>(
				["item", data.id],
				updatedItem
			)
		},
	})
}
