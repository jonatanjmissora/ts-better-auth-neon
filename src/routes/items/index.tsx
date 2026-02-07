import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { createFileRoute } from "@tanstack/react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis, Pencil, Trash2 } from "lucide-react"
import { startTransition, Suspense, useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { itemsQueryOptions } from "queries/items/items-query"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ResponseItemType } from "db/items/schema"
import { useDeleteItem } from "queries/items/use-delete-item"
import { toast } from "sonner"

export const Route = createFileRoute("/items/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<h2 className="text-2xl font-bold">Items</h2>
			<Suspense fallback={<div>Cargando...</div>}>
				<ItemsList />
			</Suspense>
		</section>
	)
}

function ItemsList() {
	const { data: items } = useSuspenseQuery(itemsQueryOptions)

	return (
		<div className="flex flex-col gap-3 w-3/4">
			{items.map(item => (
				<Card
					className="flex flex-col gap-0 w-full p-4 relative text-xs 2xl:text-base"
					key={item.id}
				>
					<div className="absolute top-2 right-2">
						<DropdownMenuComponent item={item} />
					</div>
					<CardTitle>ID: {item.id}</CardTitle>
					<CardContent className="flex gap-2 items-center justify-around">
						<span>Nombre: {item.name}</span>
						<span>Teléfono: {item.phone}</span>
						<span>Fecha: {item.date.toString()}</span>
						<span>Categoría: {item.category.name}</span>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

const DropdownMenuComponent = ({ item }: { item: ResponseItemType }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					<Ellipsis size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-28 2xl:w-40 p-4 text-xs 2xl:text-base"
				align="end"
			>
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex justify-center gap-2 items-center m-1 2xl:m-4"
						onClick={() => console.log("Editar")}
					>
						<Pencil size={14} />
						Editar
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DeleteItemAlertDialog item={item} setIsOpen={setIsOpen} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function DeleteItemAlertDialog({
	item,
	setIsOpen,
}: {
	item: ResponseItemType
	setIsOpen: (open: boolean) => void
}) {
	const { mutateAsync: deleteItemMutation, isPending } = useDeleteItem(item.id)

	const handleDelete = async () => {
		setIsOpen(false)
		startTransition(async () => {
			toast.promise(deleteItemMutation(), {
				loading: "borrando item...",
				success: "item borrado exitosamente",
				error: "Error al borrar item",
			})
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost">
					<Trash2 size={14} />
					Borrar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Estas seguro de borrar el dato?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Esto eliminará permanentemente el
						dato de nuestros servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsOpen(false)}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} disabled={isPending}>
						{isPending ? "Eliminando..." : "Eliminar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
