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
	const { mutateAsync: deleteCategoryMutation, isPending } = useDeleteCategory(
		category.id
	)
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			id: category.id,
		},
		validators: {
			onSubmit: categoryIdValidator,
		},
		onSubmit: async ({ value }) => {
			try {
				const result = await deleteCategoryMutation({ data: { id: value.id } })

				if (!result) {
					toast.error("Error al eliminar el item")
					return
				}
				toast.success("Item eliminado exitosamente")
				router.invalidate()
			} catch (error) {
				console.error("Error al eliminar el item", error)
			}
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
		</form>
	)
}
