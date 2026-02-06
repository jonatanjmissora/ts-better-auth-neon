import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { getItemsDB } from "db/items/get-items-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const getItemsServer = createServerFn().handler(async () => {
	const request = getRequest()
	const session = await protectedServerFn(request)

	return await getItemsDB(session.user.id)
})
