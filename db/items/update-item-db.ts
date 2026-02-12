import { delay } from "lib/utils"
import { db } from "db/drizzle"
import { items } from "./schema"
import { and, eq } from "drizzle-orm"
import { UpdateItemType } from "./items-validator"

export async function updateItemDB(updatedItem: UpdateItemType) {
	try {
		await delay()
		const result = await db
			.update(items)
			.set({
				name: updatedItem.name,
				phone: updatedItem.phone,
				date: updatedItem.date,
				categoryId: updatedItem.categoryId,
			})
			.where(
				and(eq(items.id, updatedItem.id), eq(items.userId, updatedItem.userId))
			)
			.returning({
				id: items.id,
				name: items.name,
				phone: items.phone,
				date: items.date,
				userId: items.userId,
				categoryId: items.categoryId,
			})
		return result[0]
	} catch (error) {
		console.error(
			"ERROR actualizando item:",
			error instanceof Error ? error.message : error
		)
	}
}

// aca no puedo retornar category {id:..., name:...} porque el result, solo devuelve columnas de la fila que se esta actualizando. Si quiero obtener category, la funcion que llama a updateItemDB, debe hacer un query adicional
