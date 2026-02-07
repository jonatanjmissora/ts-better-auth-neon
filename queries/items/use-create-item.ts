import { createItemServer } from "server/items/create-item-server"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ItemFormType } from "db/items/items-validator"
import { CategoryType } from "db/categories/schema"
import { ItemType, ResponseItemType } from "db/items/schema"
import { setItemForQuery } from "lib/utils"

type CreateItemVariables = {
	data: ItemFormType
	category: CategoryType
}


export function useCreateItem() {
	const queryClient = useQueryClient()

	return useMutation<ItemType, Error, CreateItemVariables>({
		mutationFn: ({data}: {data: ItemFormType}) => createItemServer({data}),
		onSuccess: async (data, variables) => {
			queryClient.setQueryData<ResponseItemType[]>(["items"], oldItems => {
				if (!oldItems) return oldItems
				const newItem = setItemForQuery(data, variables.category)
				const newItems = [newItem, ...oldItems]
				return newItems
			})
			
		},
	})
}