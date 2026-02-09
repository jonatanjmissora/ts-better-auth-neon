import EditForm from "@/components/items/edit-form"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const SearchSchema = z.object({
	id: z.string(),
})

export const Route = createFileRoute("/items/edit")({
	component: RouteComponent,
	validateSearch: search => SearchSchema.parse(search),
})

function RouteComponent() {
	const { id } = Route.useSearch()

	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<EditForm itemId={id} />
		</section>
	)
}
