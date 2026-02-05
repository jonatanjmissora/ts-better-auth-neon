import { z } from "zod"

export const itemSchema = z.object({
	name: z.string().min(1),
	date: z.coerce.date(),
	phone: z.string().min(6),
	categoryId: z.number(),
})
