import { db } from "db/drizzle"
import { categories } from "./schema"

export const getCategoriesDB = async () => {
	return db
		.select({
			id: categories.id,
			name: categories.name,
		})
		.from(categories)
		.orderBy(categories.name)
}
