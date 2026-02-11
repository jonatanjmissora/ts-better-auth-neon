import { db } from "db/drizzle"
import { delay } from "lib/utils"
import { and, eq } from "drizzle-orm"
import { categories } from "./schema"

export async function deleteCategoryDB(categoryId: string, userId: string) {
	await delay()
	console.log("Deleting category:", categoryId)
	try {
		return await db
			.delete(categories)
			.where(and(eq(categories.id, categoryId), eq(categories.userId, userId)))
			.returning()
	} catch (error) {
		console.error("Error deleting category:", error)
		throw error
	}
}
