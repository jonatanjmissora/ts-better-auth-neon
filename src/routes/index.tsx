import { createFileRoute } from "@tanstack/react-router"
import Header from "../components/Header"
import { protectedRoute } from "lib/auth/protected-route"

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		await protectedRoute()
		return {}
	},
})

function App() {
	return (
		<section className="flex flex-col">
			<Header />
			<span className="font-bold text-4xl p-20">DASHBOARD</span>
		</section>
	)
}
