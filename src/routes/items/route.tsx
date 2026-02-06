import Header from "@/components/Header"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { protectedRoute } from "lib/auth/protected-route"
import { itemsQueryOptions } from "queries/items/items-query"
import { getQueryClient } from "queries/querie-client"

export const Route = createFileRoute("/items")({
	component: RouteComponent,
	loader: async () => {
		await protectedRoute()
		const queryClient = getQueryClient()
		queryClient.ensureQueryData(itemsQueryOptions)

		return {}
	},
})

function RouteComponent() {
	return (
		<section className="flex flex-col">
			<Header />
			<Outlet />
		</section>
	)
}
