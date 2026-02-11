import { z } from "zod"

export const categoryFormValidator = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
})

export type CategoryFormType = z.infer<typeof categoryFormValidator>

export const categoryIdValidator = z.object({
	id: z.string().uuid("ID inválido"),
})

export const updateCategoryValidator = categoryFormValidator.extend({
	id: z.string().min(1, "Id requerido"),
	userId: z.string().min(1, "UserId requerido"),
})

export type UpdateCategoryType = z.infer<typeof updateCategoryValidator>
