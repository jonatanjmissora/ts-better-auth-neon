import { z } from "zod"

export const newItemValidator = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	date: z
		.number()
		.min(202600000000, "La fecha es requerida")
		.max(205000000000, "La fecha no puede exceder 2050"),
	phone: z
		.number()
		.min(2000000000, "El teléfono debe tener 10 dígitos")
		.max(9999999999, "El teléfono no debe tener mas de 10 dígitos"),
	categoryId: z.number().min(1, "La categoría es requerida"),
})

export type ItemFormType = z.infer<typeof newItemValidator>

export const itemIdValidator = z.object({
	id: z.string().uuid("ID inválido"),
})
