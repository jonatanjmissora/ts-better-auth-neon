import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FieldGroup } from "../ui/field"
import { Field } from "../ui/field"
import { FieldLabel } from "../ui/field"
import { FieldError } from "../ui/field"
import { useRouter } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { itemFormValidator } from "db/items/items-validator"
import { toast } from "sonner"
import { useCreateItem } from "queries/items/use-create-item"
import { categoriesQueryOptions } from "queries/categories/get-categories-query"
import { useQuery } from "@tanstack/react-query"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select"
import { Loader, X } from "lucide-react"

export default function CreateForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter()
	const { data: categories, isLoading } = useQuery(categoriesQueryOptions)
	const { mutateAsync: createItemMutation, isPending, error } = useCreateItem()

	const form = useForm({
		defaultValues: {
			name: "",
			phone: 0,
			categoryId: 0,
			date: 0,
		},
		validators: {
			onSubmit: itemFormValidator,
		},
		onSubmit: async ({ value }) => {
			try {
				const category = categories?.find(
					category => category.id === value.categoryId
				)
				if (!category) return
				const result = await createItemMutation({ data: value, category })

				if (!result) {
					toast.error("Error al crear el item")
					return
				}
				toast.success("Item creado exitosamente")
				router.navigate({ to: "/items" })
			} catch (error) {
				console.error("Error al crear el item", error)
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
					onClick={() => router.navigate({ to: "/items" })}
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
					<h2 className="text-2xl font-bold">Crear Item</h2>

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
						name="phone"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Telefono</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(Number(e.target.value))}
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
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Servicio</FieldLabel>

									{isLoading && (
										<div className="flex items-center gap-2">
											Cargando... <Loader size={20} className="animate-spin" />
										</div>
									)}
									{!isLoading && (
										<Select
											value={
												field.state.value
													? String(field.state.value)
													: undefined
											}
											onValueChange={value => {
												field.handleChange(Number(value))
											}}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Seleccionar categoría" />
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													<SelectLabel>Servicios</SelectLabel>

													{categories?.map(category => (
														<SelectItem
															key={category.id}
															value={String(category.id)}
														>
															{category.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}

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
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Fecha</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(Number(e.target.value))}
										aria-invalid={isInvalid}
										placeholder=""
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
