import { TanStackDevtools } from "@tanstack/react-devtools"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { Toaster } from "sonner"
import appCss from "../styles.css?url"
import { Session } from "better-auth"
import { getSession } from "server/getSession"
import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "queries/querie-client"

export const Route = createRootRouteWithContext<{
	session: Session | null
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Better Auth Neon",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	loader: async () => {
		const session = await getSession()
		return { session }
	},
	shellComponent: RootDocument,
	notFoundComponent: () => <p>Not Found</p>,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient()

	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster />
				</QueryClientProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
