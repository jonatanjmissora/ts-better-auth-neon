import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis, Loader, Pencil, Trash2 } from "lucide-react"
import { Suspense, useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { itemsQueryOptions } from "queries/items/items-query"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ResponseItemType } from "db/items/schema"
import { useDeleteItem } from "queries/items/use-delete-item"
import { toast } from "sonner"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/items/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<h2 className="text-2xl font-bold underline mb-5">Items</h2>
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
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
					<Link to={`/items/edit`} search={{ id: item.id }}>
						<Button variant="ghost">
							<Pencil size={14} />
							Editar
						</Button>
					</Link>
					<DropdownMenuSeparator />
					<DeleteItemAlertDialog item={item} setIsMenuOpen={setIsMenuOpen} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function DeleteItemAlertDialog({
	item,
	setIsMenuOpen,
}: {
	item: ResponseItemType
	setIsMenuOpen: (open: boolean) => void
}) {
	const { mutateAsync: deleteItemMutation, isPending } = useDeleteItem(item.id)
	const router = useRouter()

	const form = useForm({
		onSubmit: async () => {
			try {
				console.log("ITEM", item)
				const result = await deleteItemMutation()

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
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost">
					<Trash2 size={14} />
					Borrar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogDescription></AlertDialogDescription>

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
						Esta acción no se puede deshacer. Esto eliminará permanentemente el
						dato de nuestros servidores.
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
			</AlertDialogContent>
		</AlertDialog>
	)
}
