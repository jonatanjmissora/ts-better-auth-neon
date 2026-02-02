import { createFileRoute } from "@tanstack/react-router"
import { RegisterForm } from "@/components/register-form"

export const Route = createFileRoute("/register")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="w-screen pt-30 flex flex-col justify-center items-center">
			<RegisterForm />
		</section>
	)
}
