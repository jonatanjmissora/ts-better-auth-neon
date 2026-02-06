import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { insertItem } from "db/items/item-insert"
import { itemSchema } from "db/types/items-type"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const createItem = createServerFn({ method: "POST" })
	.inputValidator(itemSchema)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		const newItem = {
			...data,
			id: crypto.randomUUID(),
			userId: session.user.id,
		}

		const result = await insertItem(newItem)
		return result[0]
	})
