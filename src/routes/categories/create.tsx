import CreateForm from "@/components/categories/create-form"
import { createFileRoute } from "@tanstack/react-router"
import { Route as RootRoute } from "@/routes/__root"

export const Route = createFileRoute("/categories/create")({
	component: RouteComponent,
})

function RouteComponent() {
	const { session } = RootRoute.useLoaderData()
	if (!session) return null

	return (
		<section className="pt-10 2xl:pt-20 flex flex-col items-center">
			<CreateForm />
		</section>
	)
}
