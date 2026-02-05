import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/items/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="p-20 flex flex-col items-center">
			Hello "/items/"!
		</section>
	)
}
