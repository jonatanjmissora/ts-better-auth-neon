import { db } from "db/drizzle"
import { items, NewItemType } from "./schema"
import { delay } from "lib/utils"

export async function insertItemDB(newItem: NewItemType) {
	await delay()
	return await db.insert(items).values(newItem).returning()
}
