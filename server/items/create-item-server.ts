import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { insertItemDB } from "db/items/insert-item-db"
import { itemFormValidator } from "db/items/items-validator"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const createItemServer = createServerFn({ method: "POST" })
	.inputValidator(itemFormValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		const newItem = {
			...data,
			id: crypto.randomUUID(),
			userId: session.user.id,
		}

		const result = await insertItemDB(newItem)
		return result[0]
	})
