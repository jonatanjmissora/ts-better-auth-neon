import { getCategories } from "db/categories/get-categories"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const getCategoriesFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getRequest()
		await protectedServerFn(request)
		return await getCategories()
	}
)
