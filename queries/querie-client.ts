import { QueryClient } from "@tanstack/react-query"

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
	// En el server: SIEMPRE un cliente nuevo
	if (typeof window === "undefined") {
		return new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 30, // 30s (ajustable)
					retry: false,
				},
			},
		})
	}

	// En el browser: reutilizamos el mismo
	if (!browserQueryClient) {
		browserQueryClient = new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 30,
					retry: false,
				},
			},
		})
	}

	return browserQueryClient
}
