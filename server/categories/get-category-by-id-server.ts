import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { getCategoryByIdDB } from "db/categories/get-category-by-id-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const getCategoryByIdServer = createServerFn()
	.inputValidator((data: { categoryId: string }) => data)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		return await getCategoryByIdDB(data.categoryId, session.user.id)
	})
