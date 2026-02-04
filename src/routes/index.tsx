import { createFileRoute } from "@tanstack/react-router"
import { authMiddleware } from "lib/middleware"
import Header from "../components/Header"

export const Route = createFileRoute("/")({
	component: App,
	// server: {
	// 	middleware: [authMiddleware],
	// },
})

function App() {
	return (
		<section className="flex flex-col">
			<Header />
			<span className="font-bold text-4xl p-20">DASHBOARD</span>
		</section>
	)
}
