import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FieldGroup } from "../ui/field"
import { Field } from "../ui/field"
import { FieldLabel } from "../ui/field"
import { FieldError } from "../ui/field"
import { useRouter } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { itemSchema } from "db/types/items-type"
import { toast } from "sonner"
import { useCreateItem } from "queries/items/useCreateItem"

export default function CreateForm({
	sessionUserId,
	className,
	...props
}: React.ComponentProps<"div"> & { sessionUserId: string }) {
	const router = useRouter()
	const {
		mutateAsync: createItemMutation,
		isPending,
		error,
	} = useCreateItem(sessionUserId)
	const form = useForm({
		defaultValues: {
			name: "",
			phone: "",
			categoryId: 0,
			date: new Date(),
		},
		validators: {
			onSubmit: itemSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const result = await createItemMutation({ data: value })

				console.log("RESULT", result)
			} catch (error) {
				console.error("Error al crear el item", error)
			}
			// if (!value.id) {
			// 	toast.error("Error al crear el item")
			// 	return
			// }

			// toast.success("Item creado exitosamente")
			router.invalidate()
		},
	})

	return (
		<div className={cn("min-w-1/4 flex flex-col gap-6", className)} {...props}>
			<form
				id="create-form"
				onSubmit={e => {
					e.preventDefault()
					form.handleSubmit()
				}}
			>
				<FieldGroup>
					<h2 className="text-2xl font-bold">Crear Item</h2>

					<form.Field
						name="name"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
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
						name="phone"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Telefono</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value ?? "0"}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder=""
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<form.Field
						name="categoryId"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Servicio</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(Number(e.target.value))}
										aria-invalid={isInvalid}
										placeholder="0"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<form.Field
						name="date"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Fecha</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="datetime-local"
										value={format(field.state.value, "yyyy-MM-dd'T'HH:mm")}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(new Date(e.target.value))}
										aria-invalid={isInvalid}
										placeholder=""
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					/>

					<Field>
						<Button type="submit">{isPending ? "Creando..." : "Crear"}</Button>
					</Field>

					{error && <p>{error.message}</p>}
				</FieldGroup>
			</form>
		</div>
	)
}
