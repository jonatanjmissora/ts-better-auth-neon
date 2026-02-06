import { db } from "db/drizzle"
import { categories } from "./schema"

export const getCategories = async () => {
	return db
		.select({
			id: categories.id,
			name: categories.name,
		})
		.from(categories)
		.orderBy(categories.name)
}
