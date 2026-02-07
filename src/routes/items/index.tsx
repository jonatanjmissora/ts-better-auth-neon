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
import { Suspense } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { itemsQueryOptions } from "queries/items/items-query"

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
						<DropdownMenuComponent />
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

const DropdownMenuComponent = () => {
	return (
		<DropdownMenu>
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
					<DropdownMenuItem className="flex justify-end m-1 2xl:m-4">
						<Pencil size={14} />
						Editar
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuItem className="flex justify-end m-1 2xl:m-4">
						<Trash2 size={14} /> Borrar
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
