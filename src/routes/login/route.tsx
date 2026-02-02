import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="w-screen pt-30 flex flex-col justify-center items-center">
			<LoginForm />
		</section>
	);
}
