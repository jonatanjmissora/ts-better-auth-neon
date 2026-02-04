import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { protectedServerFn } from "lib/auth/protected-serverFn"

export const deletePost = createServerFn({ method: "POST" }).handler(
	async () => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		// lógica segura
	}
)
