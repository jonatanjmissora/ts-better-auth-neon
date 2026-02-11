import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CategoryType } from "db/categories/schema"
import { Ellipsis, Pencil, Trash2 } from "lucide-react"
import { categoriesQueryOptions } from "queries/categories/categories-query"
import { Suspense, useState } from "react"

export const Route = createFileRoute("/categories/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<h2 className="text-2xl font-bold underline mb-5">Categories</h2>
			<Suspense fallback={<div>Cargando...</div>}>
				<CategoryList />
			</Suspense>
		</section>
	)
}

function CategoryList() {
	const { data: categories } = useSuspenseQuery(categoriesQueryOptions)

	return (
		<div className="flex flex-col gap-3 w-3/4">
			{categories.map(category => (
				<Card
					className="flex flex-col gap-0 w-full p-4 relative text-xs 2xl:text-base"
					key={category.id}
				>
					<div className="absolute top-1/2 -translate-y-1/2 right-2">
						<DropdownMenuComponent category={category} />
					</div>
					<CardTitle>ID: {category.id}</CardTitle>
					<CardContent className="flex gap-2 items-center justify-around">
						<span>Nombre: {category.name}</span>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

const DropdownMenuComponent = ({ category }: { category: CategoryType }) => {
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
					<Link to={`/category/edit`} search={{ id: category.id }}>
						<Button variant="ghost">
							<Pencil size={14} />
							Editar
						</Button>
					</Link>
					<DropdownMenuSeparator />
					<DeleteCategoryAlertDialog
						category={category}
						setIsMenuOpen={setIsMenuOpen}
					/>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function DeleteCategoryAlertDialog({
	category,
	setIsMenuOpen,
}: {
	category: CategoryType
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

				{/* <DeleteForm category={category} setIsMenuOpen={setIsMenuOpen} /> */}
			</AlertDialogContent>
		</AlertDialog>
	)
}
