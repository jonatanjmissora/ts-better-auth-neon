import Header from "@/components/Header"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { protectedRoute } from "lib/auth/protected-route"
import { itemsQueryOptions } from "queries/items/items-query"

export const Route = createFileRoute("/items")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await protectedRoute()
		context.queryClient.ensureQueryData(itemsQueryOptions)

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
