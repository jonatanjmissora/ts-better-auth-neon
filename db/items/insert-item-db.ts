import { db } from "db/drizzle"
import { items, ItemType } from "./schema"
import { delay } from "lib/utils"

export async function insertItemDB(newItem: ItemType) {
	await delay()
	return await db.insert(items).values(newItem).returning()
}
