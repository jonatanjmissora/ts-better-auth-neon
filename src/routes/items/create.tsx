import CreateForm from "@/components/items/create-form"
import { createFileRoute } from "@tanstack/react-router"
import { Route as RootRoute } from "@/routes/__root"

export const Route = createFileRoute("/items/create")({
	component: RouteComponent,
})

function RouteComponent() {
	const { session } = RootRoute.useLoaderData()
	if (!session) return null

	return (
		<section className="p-20 flex flex-col items-center">
			<CreateForm sessionUserId={session.user.id} />
		</section>
	)
}
