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
	// const item = getItemFromQuery(id)

	return <div>Hello "/items/edit"! {JSON.stringify(id)}</div>
}
