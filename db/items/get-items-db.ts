import { db } from "db/drizzle"
import { items } from "./schema"
import { eq } from "drizzle-orm"
import { delay } from "lib/utils"
import { categories } from "../categories/schema"

export async function getItemsDB(userId: string) {
	try {
		await delay()
		return await db
			.select({
				id: items.id,
				name: items.name,
				phone: items.phone,
				date: items.date,
				category: {
					id: categories.id,
					name: categories.name,
				},
				userId: items.userId,
			})
			.from(items)
			.innerJoin(categories, eq(items.categoryId, categories.id))
			.orderBy(items.date)
			.where(eq(items.userId, userId))
	} catch (error) {
		console.error(
			"ERROR obteniendo items:",
			error instanceof Error ? error.message : error
		)
	}
}
