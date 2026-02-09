import { createRouter } from "@tanstack/react-router"
// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { getQueryClient } from "queries/querie-client"

const queryClient = getQueryClient()

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {
			queryClient,
			session: null,
		},
		defaultPendingMs: 0,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true,
	})

	return router
}
