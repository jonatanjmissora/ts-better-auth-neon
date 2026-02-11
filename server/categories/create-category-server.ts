import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { categoryFormValidator } from "db/categories/categories-validator"
import { insertCategoryDB } from "db/categories/insert-categories-db"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const createCategoryServer = createServerFn({ method: "POST" })
	.inputValidator(categoryFormValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)
		const newCategory = {
			...data,
			id: crypto.randomUUID(),
			userId: session.user.id,
		}

		const result = await insertCategoryDB(newCategory)
		return result[0]
	})
