import { db } from "db/drizzle"
import { items, NewItemType } from "./schema"

export async function insertItemDB(newItem: NewItemType) {
	return await db.insert(items).values(newItem).returning()
}
