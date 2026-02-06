import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { getCategoriesDB } from "db/categories/get-categories-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const getCategoriesServer = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getRequest()
		await protectedServerFn(request)
		return await getCategoriesDB()
	}
)
