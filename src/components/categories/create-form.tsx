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
import { Loader, X } from "lucide-react"
import { categoryFormValidator } from "db/categories/categories-validator"
import { useCreateCategory } from "queries/categories/use-create-category"

export default function CreateForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter()
	const {
		mutateAsync: createCategoryMutation,
		isPending,
		error,
	} = useCreateCategory()

	const form = useForm({
		defaultValues: {
			name: "",
			price: 0,
		},
		validators: {
			onSubmit: categoryFormValidator,
		},
		onSubmit: async ({ value }) => {
			try {
				const result = await createCategoryMutation({ data: value })
				if (!result) {
					toast.error("Error al crear categoria")
					return
				}
				toast.success("Categoria creado exitosamente")
				router.navigate({ to: "/categories" })
			} catch (error) {
				console.error("Error al crear la categoría", error)
			}
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
				id="create-form"
				onSubmit={e => {
					e.preventDefault()
					form.handleSubmit()
				}}
			>
				<FieldGroup className="gap-5">
					<h2 className="text-2xl font-bold">Crear Category</h2>

					<form.Field
						name="name"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="mi nombre"
									/>
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
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(Number(e.target.value))}
										aria-invalid={isInvalid}
										placeholder="mi nombre"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<Field>
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<div className="flex gap-2">
									Creando... <Loader className="animate-spin"></Loader>
								</div>
							) : (
								"Crear"
							)}
						</Button>
					</Field>

					{error && <p>{error.message}</p>}
				</FieldGroup>
			</form>
		</div>
	)
}
