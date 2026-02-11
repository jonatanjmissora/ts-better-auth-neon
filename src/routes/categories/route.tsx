import Header from "@/components/Header"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { protectedRoute } from "lib/auth/protected-route"
import { categoriesQueryOptions } from "queries/categories/get-categories-query"

export const Route = createFileRoute("/categories")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await protectedRoute()
		context.queryClient.ensureQueryData(categoriesQueryOptions)
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
