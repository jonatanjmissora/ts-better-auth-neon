import { createServerFn } from "@tanstack/react-start"
import { insertItem } from "db/items/item-insert"
import { itemSchema } from "db/types/items-type"
import { getSession } from "server/getSession"

export const createItem = createServerFn({ method: "POST" })
	.inputValidator(itemSchema)
	.handler(async ({ data }) => {
		const session = await getSession()
		if (!session) {
			throw new Response("Unauthorized", { status: 401 })
		}

		const newItem = {
			...data,
			id: crypto.randomUUID(),
			userId: session.user.id,
		}

		const result = await insertItem(newItem)
		return result[0]
	})
