import Header from "@/components/Header"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { protectedRoute } from "lib/auth/protected-route"

export const Route = createFileRoute("/items")({
	component: RouteComponent,
	loader: async () => {
		await protectedRoute()
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
