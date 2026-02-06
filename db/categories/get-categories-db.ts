import { db } from "db/drizzle"
import { categories } from "./schema"
import { delay } from "lib/utils"

export const getCategoriesDB = async () => {
	await delay()
	return db
		.select({
			id: categories.id,
			name: categories.name,
		})
		.from(categories)
		.orderBy(categories.name)
}
