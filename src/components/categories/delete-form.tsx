import { useDeleteCategory } from "queries/categories/use-delete-category"
import { CategoryType } from "db/schema"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { categoryIdValidator } from "db/categories/categories-validator"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"

export default function DeleteForm({
	category,
	setIsMenuOpen,
}: {
	category: CategoryType
	setIsMenuOpen: (open: boolean) => void
}) {
	const {
		mutateAsync: deleteCategoryMutation,
		error,
		isPending,
	} = useDeleteCategory(category.id)
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			id: category.id,
		},
		validators: {
			onSubmit: categoryIdValidator,
		},
		onSubmit: async ({ value }) => {
			const result = await deleteCategoryMutation({ data: { id: value.id } })

			if (!result) {
				console.error("Error al eliminar la categoria", error)
				toast.error("Error al eliminar la categoria")
			}
			toast.success("Categoria eliminada exitosamente")
			router.invalidate()
		},
	})

	return (
		<form
			id="create-form"
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={e => {
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<p className="text-xl font-semibold text-center">
				¿Estás seguro de borrar el item?
			</p>

			<p className="text-center opacity-50 text-xs balance">
				Esta acción no se puede deshacer. Esto eliminará permanentemente el dato
				de nuestros servidores.
			</p>

			<div className="flex justify-center items-center gap-2">
				<Button
					type="button"
					variant="ghost"
					onClick={() => setIsMenuOpen(false)}
				>
					Cancelar
				</Button>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<div className="flex gap-2">
							Eliminando... <Loader className="animate-spin"></Loader>
						</div>
					) : (
						"Eliminar"
					)}
				</Button>
			</div>
			{error && (
				<p className="text-red-500 text-xs">
					Error al eliminar la categoria, posible que la categoria este asociada
					a un item
				</p>
			)}
		</form>
	)
}
