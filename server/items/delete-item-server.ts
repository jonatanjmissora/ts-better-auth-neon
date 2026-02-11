import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { deleteItemDB } from "db/items/delete-item-db"
import { itemIdValidator } from "db/items/items-validator"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const deleteItemServer = createServerFn({ method: "POST" })
	.inputValidator(itemIdValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		const result = await deleteItemDB(data.id, session.user.id)
		return result[0]
	})
