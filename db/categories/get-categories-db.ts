import { db } from "db/drizzle"
import { categories } from "./schema"
import { eq } from "drizzle-orm"
import { delay } from "lib/utils"

export async function getCategoriesDB(userId: string) {
	try {
		await delay()
		return db
			.select()
			.from(categories)
			.orderBy(categories.name)
			.where(eq(categories.userId, userId))
	} catch (error) {
		console.error(
			"ERROR leyendo categorias:",
			error instanceof Error ? error.message : error
		)
	}
}
