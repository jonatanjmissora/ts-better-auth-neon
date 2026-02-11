import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { deleteCategoryDB } from "db/categories/delete-category-db"
import { categoryIdValidator } from "db/categories/categories-validator"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const deleteCategoryServer = createServerFn({ method: "POST" })
	.inputValidator(categoryIdValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		const result = await deleteCategoryDB(data.id, session.user.id)
		return result[0]
	})
