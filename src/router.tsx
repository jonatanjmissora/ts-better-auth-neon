import { createRouter } from "@tanstack/react-router"
// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { getQueryClient } from "queries/querie-client"
import { Session } from "better-auth"
import { QueryClient } from "@tanstack/react-query"

export type RouterContext = {
	session: Session | null
	queryClient: QueryClient
}

declare module "@tanstack/react-router" {
	interface Register {
		routerContext: RouterContext
	}
}

const queryClient = getQueryClient()

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {
			session: null,
			queryClient,
		},
		defaultPendingMs: 0,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true,
	})

	return router
}
