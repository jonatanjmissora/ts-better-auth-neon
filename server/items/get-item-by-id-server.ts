import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { getItemByIdDB } from "db/items/get-item-by-id-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const getItemByIdServer = createServerFn()
	.inputValidator((data: { itemId: string }) => data)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		return await getItemByIdDB(data.itemId, session.user.id)
	})
