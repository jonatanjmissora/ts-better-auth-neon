import { db } from "db/drizzle"
import { items, ItemType } from "./schema"
import { delay } from "lib/utils"

export async function insertItemDB(newItem: ItemType) {
	try {
		await delay()
		return await db.insert(items).values(newItem).returning()
	} catch (error) {
		console.error(
			"ERROR obteniendo item:",
			error instanceof Error ? error.message : error
		)
	}
}
