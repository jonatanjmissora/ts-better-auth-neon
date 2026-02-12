import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FieldGroup } from "../ui/field"
import { Field } from "../ui/field"
import { FieldLabel } from "../ui/field"
import { FieldError } from "../ui/field"
import { useRouter } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { Loader, X } from "lucide-react"
import { categoryQueryOptions } from "queries/categories/categories-query"
import { categoryFormValidator } from "db/categories/categories-validator"
import { useUpdateCategory } from "queries/categories/use-update-category"

export default function EditForm({
	categoryId,
	className,
	...props
}: React.ComponentProps<"div"> & { categoryId: string }) {
	const router = useRouter()

	const { data: category, isLoading: isLoadingCategory } = useQuery(
		categoryQueryOptions(categoryId)
	)
	const {
		mutateAsync: updateCategoryMutation,
		isPending,
		error,
	} = useUpdateCategory()

	const form = useForm({
		defaultValues: {
			name: category?.name ?? "",
			price: category?.price ?? 0,
		},
		validators: {
			onSubmit: categoryFormValidator,
		},
		onSubmit: async ({ value }) => {
			if (!category) {
				return
			}
			const updatedCategory = {
				...value,
				id: category.id,
				userId: category.userId,
			}
			console.log("updated", updatedCategory)
			const result = await updateCategoryMutation({ data: updatedCategory })
			console.log("RESULT", result)
			if (!result) {
				console.error("Error al editar la categoria", error)
				toast.error("Error al editar la categoria")
			}
			toast.success("Categoria editada exitosamente")
			router.navigate({ to: "/categories" })
		},
	})

	return (
		<div
			className={cn(
				"min-w-1/3 flex flex-col gap-6 border rounded-lg py-8 px-12 relative",
				className
			)}
			{...props}
		>
			<div className="absolute top-4 right-4">
				<Button
					variant="ghost"
					className="cursor-pointer"
					onClick={() => router.navigate({ to: "/categories" })}
				>
					<X size={20} />
				</Button>
			</div>
			<form
				id="edit-form"
				onSubmit={e => {
					e.preventDefault()
					form.handleSubmit()
				}}
			>
				<FieldGroup className="gap-5">
					<h2 className="text-2xl font-bold">Crear Categoria</h2>

					<form.Field
						name="name"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
									{isLoadingCategory ? (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingCategory ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									) : (
										!isLoadingCategory &&
										category && (
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="mi nombre"
											/>
										)
									)}
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<form.Field
						name="price"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Precio</FieldLabel>
									{isLoadingCategory ? (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingCategory ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									) : (
										!isLoadingCategory &&
										category && (
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e =>
													field.handleChange(Number(Number(e.target.value)))
												}
												aria-invalid={isInvalid}
												placeholder=""
											/>
										)
									)}
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<Field>
						<Button
							type="submit"
							disabled={isPending || isLoadingCategory || !category}
						>
							{isPending ? (
								<div className="flex gap-2">
									Editando... <Loader className="animate-spin"></Loader>
								</div>
							) : (
								"Editar"
							)}
						</Button>
					</Field>

					{error && <p>{error?.message}</p>}
				</FieldGroup>
			</form>

			{!isLoadingCategory && !category && (
				<p className="text-red-700 text-center">⚠ Categoria no encontrado</p>
			)}
		</div>
	)
}
