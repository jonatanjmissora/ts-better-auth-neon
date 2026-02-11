import EditForm from "@/components/categories/edit-form"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const SearchSchema = z.object({
	id: z.coerce.string(),
})

export const Route = createFileRoute("/categories/edit")({
	component: RouteComponent,
	validateSearch: search => SearchSchema.parse(search),
})

function RouteComponent() {
	const { id } = Route.useSearch()

	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			{id ? <EditForm categoryId={id} /> : <p>Categoria sin ID en url</p>}
		</section>
	)
}
