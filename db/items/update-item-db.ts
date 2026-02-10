import { delay } from "lib/utils"
import { db } from "db/drizzle"
import { items } from "./schema"
import { categories } from "db/categories/schema"
import { and, eq } from "drizzle-orm"
import { UpdateItemType } from "./items-validator"

export async function updateItemDB(updatedItem: UpdateItemType) {
	await delay()
	return await db
		.update(items)
		.set({
			id: updatedItem.id,
			name: updatedItem.name,
			phone: updatedItem.phone,
			date: updatedItem.date,
			categoryId: updatedItem.categoryId,
			userId: updatedItem.userId,
		})
		.from(items)
		.innerJoin(categories, eq(items.categoryId, categories.id))
		.where(
			and(eq(items.id, updatedItem.id), eq(items.userId, updatedItem.userId))
		)
		.returning({
			id: items.id,
			name: items.name,
			phone: items.phone,
			date: items.date,
			userId: items.userId,
			category: {
				id: categories.id,
				name: categories.name,
			},
		})
}
