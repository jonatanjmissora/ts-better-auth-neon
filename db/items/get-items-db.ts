import { db } from "db/drizzle"
import { items } from "./schema"
import { eq } from "drizzle-orm"

export async function getItemsDB(userId: string) {
	return await db.select().from(items).where(eq(items.userId, userId))
}
