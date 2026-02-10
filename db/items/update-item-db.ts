import { delay } from "lib/utils"
import { db } from "db/drizzle"
import { items } from "./schema"
import { categories } from "db/categories/schema"
import { and, eq } from "drizzle-orm"
import { UpdateItemType } from "./items-validator"

export async function updateItemDB(updatedItem: UpdateItemType) {
	await delay()
	console.log("updatedItem", updatedItem)
	const result = await db
		.update(items)
		.set({
			name: updatedItem.name,
			phone: updatedItem.phone,
			date: updatedItem.date,
			categoryId: updatedItem.categoryId,
		})
		.from(categories)
		.where(
			and(
				eq(items.id, updatedItem.id),
				eq(items.userId, updatedItem.userId),
				eq(items.categoryId, categories.id)
			)
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
	return result[0]
}
