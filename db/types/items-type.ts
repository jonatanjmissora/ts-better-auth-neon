import { z } from "zod"

export const itemSchema = z.object({
	name: z.string().min(1),
	date: z.number(),
	phone: z.number().optional(),
	categoryId: z.number(),
})
