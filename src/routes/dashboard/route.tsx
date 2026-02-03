import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authMiddleware } from "lib/middleware";
import Header from "../../components/Header";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
});

function RouteComponent() {
	return <section><Header /><Outlet /></section>;
}
