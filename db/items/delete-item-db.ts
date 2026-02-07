import { db } from "db/drizzle"
import { items } from "./schema"
import { delay } from "lib/utils"
import { eq } from "drizzle-orm"

export async function deleteItemDB(itemId: string) {
	await delay()
	return await db.delete(items).where(eq(items.id, itemId)).returning()
}
