import { delay } from "lib/utils"
import { db } from "db/drizzle"
import { categories } from "db/categories/schema"
import { and, eq } from "drizzle-orm"
import { UpdateCategoryType } from "./categories-validator"

export async function updateCategoryDB(updatedCategory: UpdateCategoryType) {
	await delay()
	const result = await db
		.update(categories)
		.set({
			name: updatedCategory.name,
			price: updatedCategory.price,
		})
		.where(
			and(
				eq(categories.id, updatedCategory.id),
				eq(categories.userId, updatedCategory.userId)
			)
		)
		.returning({
			id: categories.id,
			name: categories.name,
			price: categories.price,
			userId: categories.userId,
		})

	return result[0]
}
