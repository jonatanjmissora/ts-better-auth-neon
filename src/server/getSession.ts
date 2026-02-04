import { createServerFn } from "@tanstack/react-start"
import { auth } from "lib/auth"

export const getSession = createServerFn({ method: "GET" }).handler(
	async ({ request }) => {
		return await auth.api.getSession({
			headers: request.headers,
		})
	}
)
