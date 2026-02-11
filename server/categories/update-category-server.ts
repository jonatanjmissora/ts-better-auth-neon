import { getRequest } from "@tanstack/react-start/server"
import { updateCategoryValidator } from "db/categories/categories-validator"
import { protectedServerFn } from "lib/auth/protected-serverFn"
import { createServerFn } from "@tanstack/react-start"
import { updateCategoryDB } from "db/categories/update-category-db"

export const updateCategoryServer = createServerFn({ method: "POST" })
	.inputValidator(updateCategoryValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		await protectedServerFn(request)

		return await updateCategoryDB(data)
	})
