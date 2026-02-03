import { createFileRoute } from "@tanstack/react-router"
import { RegisterForm } from "@/components/register-form"

export const Route = createFileRoute("/register")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="w-screen sm:pt-10 2xl:pt-30 flex flex-col justify-center items-center">
			<RegisterForm />
		</section>
	)
}
