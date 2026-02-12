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
import { itemQueryOptions } from "queries/items/items-query"
import { useUpdateItem } from "queries/items/use-update-item"
import { itemFormValidator } from "db/items/items-validator"

export default function EditForm({
	itemId,
	className,
	...props
}: React.ComponentProps<"div"> & { itemId: string }) {
	const router = useRouter()
	const { data: categories, isLoading: isLoadingCategories } = useQuery(
		categoriesQueryOptions
	)
	const { data: item, isLoading: isLoadingItem } = useQuery(
		itemQueryOptions(itemId)
	)
	const { mutateAsync: updateItemMutation, isPending, error } = useUpdateItem()

	const form = useForm({
		defaultValues: {
			name: item?.name ?? "",
			phone: item?.phone ?? 0,
			categoryId: item?.category.id ?? "1",
			date: item?.date ?? 0,
		},
		validators: {
			onSubmit: itemFormValidator,
		},
		onSubmit: async ({ value }) => {
			const category = categories?.find(
				category => category.id === value.categoryId
			)
			if (!category || !item) {
				return
			}
			const updatedItem = {
				...value,
				id: item.id,
				userId: item.userId,
			}
			const result = await updateItemMutation({ data: updatedItem, category })

			if (!result) {
				console.error("Error al editar el item", error)
				toast.error("Error al editar el item")
			}
			toast.success("Item editado exitosamente")
			router.navigate({ to: "/items" })
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
				id="edit-form"
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
									{isLoadingItem ? (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingItem ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									) : (
										!isLoadingItem &&
										item && (
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
						name="phone"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Telefono</FieldLabel>
									{isLoadingItem ? (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingItem ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									) : (
										!isLoadingItem &&
										item && (
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e =>
													field.handleChange(Number(e.target.value))
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

					<form.Field
						name="categoryId"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid

							return (
								<Field data-invalid={isInvalid} className="gap-1">
									<FieldLabel htmlFor={field.name}>Servicio</FieldLabel>

									{isLoadingCategories && (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingItem ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									)}
									{!isLoadingCategories && !isLoadingItem && item && (
										<Select
											value={
												field.state.value
													? String(field.state.value)
													: undefined
											}
											onValueChange={value => {
												field.handleChange(value)
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
									{isLoadingItem ? (
										<div
											className={`w-full h-9 rounded-lg bg-gray-800/50 flex justify-center items-center border ${isLoadingItem ? "animate-pulse" : ""}`}
										>
											<Loader size={20} className="animate-spin" />
										</div>
									) : (
										!isLoadingItem &&
										item && (
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e =>
													field.handleChange(Number(e.target.value))
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
							disabled={isPending || isLoadingItem || !item}
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

			{!isLoadingItem && !item && (
				<p className="text-red-700 text-center">⚠ Item no encontrado</p>
			)}
		</div>
	)
}
