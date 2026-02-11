import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis, Pencil, Plus, Trash2 } from "lucide-react"
import { Suspense, useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { itemsQueryOptions } from "queries/items/items-query"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ItemWithCategoryType } from "db/items/schema"
import DeleteForm from "@/components/items/delete-form"

export const Route = createFileRoute("/items/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<div className="flex items-center justify-between w-3/4">
				<div></div>
				<span className="text-2xl font-bold underline mb-5">Items</span>
				<Link to="/items/create">
					<Button
						variant="link"
						className="text-lg font-semibold flex items-center gap-2"
					>
						<Plus size={16} /> Nuevo
					</Button>
				</Link>
			</div>
			<Suspense fallback={<div>Cargando...</div>}>
				<ItemsList />
			</Suspense>
		</section>
	)
}

function ItemsList() {
	const { data: items } = useSuspenseQuery(itemsQueryOptions)

	if (!items || items.length === 0) {
		return (
			<div className="flex flex-col items-center">
				<p>No hay items</p>

				<div className="flex items-center gap-2">
					<span>Por favor agregue un</span>
					<Link to="/items/create">
						<Button variant="link" className="text-base">
							nuevo item
						</Button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-3 w-3/4">
			{items.map(item => (
				<Card
					className="flex flex-col gap-0 w-full p-4 relative text-xs 2xl:text-base"
					key={item.id}
				>
					<div className="absolute top-1/2 -translate-y-1/2 right-2">
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

const DropdownMenuComponent = ({ item }: { item: ItemWithCategoryType }) => {
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
	item: ItemWithCategoryType
	setIsMenuOpen: (open: boolean) => void
}) {
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

				<DeleteForm item={item} setIsMenuOpen={setIsMenuOpen} />
			</AlertDialogContent>
		</AlertDialog>
	)
}
