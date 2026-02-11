import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { categoryFormValidator } from "db/categories/categories-validator"
import { insertCategoryDB } from "db/categories/insert-categories-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const createCategoryServer = createServerFn({ method: "POST" })
	.inputValidator(categoryFormValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		await protectedServerFn(request)
		const newCategory = { ...data, id: 4 }

		const result = await insertCategoryDB(newCategory)
		return result[0]
	})
