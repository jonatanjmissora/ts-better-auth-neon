import { db } from "db/drizzle"
import { categories, CategoryType } from "./schema"
import { delay } from "lib/utils"

export async function insertCategoryDB(newCategory: CategoryType) {
	await delay()
	return await db.insert(categories).values(newCategory).returning()
}
