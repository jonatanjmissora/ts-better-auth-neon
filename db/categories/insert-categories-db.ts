import { db } from "db/drizzle"
import { categories, CategoryType } from "./schema"
import { delay } from "lib/utils"

export async function insertCategoryDB(newCategory: CategoryType) {
	try {
		await delay()
		return await db.insert(categories).values(newCategory).returning()
	} catch (error) {
		console.error(
			"ERROR insertando categoria:",
			error instanceof Error ? error.message : error
		)
	}
}
