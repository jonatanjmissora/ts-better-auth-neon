import { getSession } from "server/getSession"
import { redirect } from "@tanstack/react-router"

export async function protectedRoute() {
	const session = await getSession()

	if (!session) {
		throw redirect({ to: "/login" })
	}

	return session
}
