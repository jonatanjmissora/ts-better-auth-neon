import { getRequest } from "@tanstack/react-start/server"
import { updateItemValidator } from "db/items/items-validator"
import { protectedServerFn } from "lib/auth/protected-serverFn"
import { createServerFn } from "@tanstack/react-start"
import { updateItemDB } from "db/items/update-item-db"

export const updateItemServer = createServerFn({ method: "POST" })
	.inputValidator(updateItemValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		await protectedServerFn(request)

		const updatedItem = {
			...data,
		}

		return await updateItemDB(updatedItem)
	})
