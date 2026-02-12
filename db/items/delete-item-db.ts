import { db } from "db/drizzle"
import { items } from "./schema"
import { delay } from "lib/utils"
import { and, eq } from "drizzle-orm"

export async function deleteItemDB(itemId: string, userId: string) {
	try {
		await delay()
		return await db
			.delete(items)
			.where(and(eq(items.id, itemId), eq(items.userId, userId)))
			.returning()
	} catch (error) {
		console.error(
			"ERROR eliminando item:",
			error instanceof Error ? error.message : error
		)
	}
}
