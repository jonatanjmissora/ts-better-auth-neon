import type { QueryClient } from "@tanstack/react-query"
import type { Session } from "@/lib/auth"

declare module "@tanstack/react-router" {
	interface Register {
		routerContext: {
			session: Session | null
			queryClient: QueryClient
		}
	}
}
