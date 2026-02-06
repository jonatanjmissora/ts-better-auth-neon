import { db } from "db/drizzle"
import { items } from "./schema"
import { eq } from "drizzle-orm"
import { delay } from "lib/utils"

export async function getItemsDB(userId: string) {
	await delay()
	return await db.select().from(items).where(eq(items.userId, userId))
}
