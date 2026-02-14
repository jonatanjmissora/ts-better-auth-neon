TEMARIO :
=========

stack: 
tanstack start  (tanstack router + tanstack query + tanstack form)
shadcn
better-auth
drizzle + neon

Pasos en la arquitectura:
0 - instalamos tanstack start
1 - better-auth 
------------------
  1.1 - instalacion de librerias
  1.2 - variables de entorno relacionadas a better-auth y neon
  1.3 - auth.ts  donde configuramos el better auth
  1.4 - db/drizzle.ts   conexion a neon con su DATABASE_URL
  1.5 - db/schema.ts  vacio por el momento
  1.6 - drizzle.config.ts
  1.7 - generamos el schema de better-auth
  1.9 - hacemos el push a neon con      npx drizzle-kit push

  aqui ya tenemos la base de datos en neon y la tabla de better-auth
  conectemos las comunicaciones entre el frontend y neon, hagamos los login, logout

  1.10 - routes/api/auth/$.ts  conectamos con la api de better auth
  1.11 - lib/auth/auth-client.ts   de donde se obtienen el signIn, signOut, signUp
  1.12 - lib/auth/route-middleware.ts    middleware para las rutas
          lib/auth/serverFn-middleware.ts middleware para las server functions

  1.13 - src/server/getSession.ts        es una forma mas controlada, de separar responsabilidades
          lib/auth/protected-route.ts
          lib/auth/protected-serverFn.ts

  1.14 - instalamos el login 03 block de shadcn.
  1.15 - colocamos el Toast en el __root.tsx

  1.16 - hacemos el login-form
  1.17 - hacemos el register-form

  1.18 - Header.tsx    utilizamos session y toggleTheme
  aqui en __root.tsx guardamos la session en el context

  hasta aqui tendriamos el header con su session y theme
  el login / register para ingresar con un usuario utilizando better-auth y almacenandolo en neon mediante drizzle
  utilizamos middlewares para proteger tanto el acceso a las rutas como a las server functions 

  2 - Tanstack Query + Streamming
----------------------------------------
  2.0 - instalacion de libreria
  2.1 - queries/query-client.ts     es un proveedor de entorno (En el primer HTTP request, inicia el queryClient para el context(para que los loaders), y en el Provider(para que lo utilicen hooks y componentes) )
  2.2 - router.tsx    agregamos el queryClient al context para consumirse en los loaders, o server functions
  2.3 - __root.tsx    agregamos el queryClient al provider para poder consumirse en los componentes mediante useQueryClient()
  2.4 - queries/categories/categories-query.ts y queries/items/items-query.ts 

  2.5 - creamos desde atras hacia adelante     
          db/items/get-items-db.ts    con drizzle + neon
          server/items/get-items-server   controlamos si hay session con protectedServerFn
          queries/items/use-items-query.ts    el hook que se encarga de obtener los items
          routes/items/route.tsx   loader con el ensureQueryData para el stream
          routes/items/index.tsx   consumimos con Suspense + useSuspenseQuery
     


</>
            
    pnpm create @tanstack/start@latest  (nitro y shadcn)

(limpiamos codigo que no sirve)


1️⃣BETTER-AUTH + NEON
================

1️⃣ instalacion
------------------

    pnpm add better-auth drizzle-orm @neondatabase/serverless dotenv zod @tanstack/react-form lucide-react
    pnpm add -D drizzle-kit tsx

1️⃣.2️⃣ .env con 
------------------

    BETTER_AUTH_SECRET
    DATABASE_URL
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET

(de https://www.better-auth.com/docs/installation)

Google client
dentro de https://console.cloud.google.com/apis/dashboard?project=ts-better-auth-neon
viendo el video https://www.youtube.com/watch?v=xqd51D3O53k&list=LL&index=8        minuto 35

1️⃣.3️⃣ lib/auth/auth.ts
--------------------------
  
    import { betterAuth } from "better-auth"
    import { drizzleAdapter } from "better-auth/adapters/drizzle"
    import { tanstackStartCookies } from "better-auth/tanstack-start"
    import { db } from "../../db/drizzle"

    export const auth = betterAuth({
      database: drizzleAdapter(db, {
        provider: "pg",
      }),
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
      },
      emailAndPassword: {
        enabled: true,
      },
      plugins: [tanstackStartCookies()],
    })

1️⃣.4️⃣ db/drizzle.ts
----------------------

   import { drizzle } from "drizzle-orm/neon-http"
   import * as schema from "./schema"

   export const db = drizzle(process.env.DATABASE_URL as string, {
     schema,
   })


1️⃣5️⃣ db/schema.ts  (vacio por ahora)

1️⃣6️⃣ drizzle.config.ts

    import "dotenv/config"
    import { defineConfig } from "drizzle-kit"

    export default defineConfig({
      out: "./drizzle",
      schema: "./db/schema.ts",
      dialect: "postgresql",
      dbCredentials: {
        url: process.env.DATABASE_URL as string,
      },
    })

1️⃣7️⃣ generar el shema de better-auth
--------------------------------------------
  
    pnpm dlx @better-auth/cli@latest generate

1️⃣8️⃣ pasar el archivo que se genero, auth-schema.ts, a db/schema.ts

1️⃣9️⃣ generar la base de datos en neon
  
    npx drizzle-kit push

( hasta este punto, tienen que estar creadas las conexiones de drizzle y neon. Tienen que estar
creadas las tablas de better-auth en neon.)
=============================================================
(Nos preparamos para poder usar lo que hemos creado, comunicacion con los request, signIn, middlewares, loginFrom, etc)


1️⃣.1️⃣0️⃣ routes/api/auth/$.ts

    import { createFileRoute } from "@tanstack/react-router";
    import { auth } from "lib/auth";
  
    export const Route = createFileRoute("/api/auth/$")({
      server: {
        handlers: {
          GET: async ({ request }: { request: Request }) => {
            return await auth.handler(request);
          },
          POST: async ({ request }: { request: Request }) => {
            return await auth.handler(request);
          },
        },
      },
    });

1️⃣.1️⃣2️⃣ db/auth-client.ts

    import { createAuthClient } from "better-auth/react"
    export const authClient = createAuthClient({
        /** The base URL of the server (optional if you're using the same domain) */
        baseURL: "http://localhost:3000"
    })

1️⃣.1️⃣3️⃣ lib/auth/route-middleware.ts

    import { redirect } from "@tanstack/react-router";
    import { createMiddleware } from "@tanstack/react-start";
    import { getRequestHeaders } from "@tanstack/react-start/server";
    import { auth } from "./auth/auth";
  
    export const authRouteMiddleware = createMiddleware().server(
        async ({ next }) => {
            const headers = getRequestHeaders();
            const session = await auth.api.getSession({ headers })
            if (!session) {
                throw redirect({ to: "/login" })
            }
            return next({
              context: {
                session,
              },
            })
        }
    );

    y asi la protegemos:

    export const Route = createFileRoute("")({
      component: RouteComponent,
      server: {
        middleware: [authMiddleware],
      },
    });

lib/auth/serverFn-middleware.ts

    import { redirect } from "@tanstack/react-router";
    import { createMiddleware } from "@tanstack/react-start";
    import { getRequestHeaders } from "@tanstack/react-start/server";
    import { auth } from "./auth/auth";
  
    export const authRouteMiddleware = createMiddleware().server(
        async ({ next }) => {
            const headers = getRequestHeaders();
            const session = await auth.api.getSession({ headers })
            if (!session) {
              throw new Response("Unauthorized", { status: 401 })
            }
            return next({
              context: {
                session,
              },
            })
        }
    );

    y asi la protegemos:
    const function = createServerFn({ method: "GET" })
      .middleware(authRouteMiddleware)
      .handler()


1️⃣.1️⃣3️⃣ Otra opcion, con middleware mas controlados y especificos
--------------------------------------------------------------------------
src/server/getSession.ts
    export const getSession = createServerFn({ method: "GET" }).handler(
      async () => {
        const request = getRequest()
        return await auth.api.getSession({
          headers: request.headers,
        })
      }
    )

con esta funcion guardamos la session en el context, en __root.tsx, para que pueda ser accedida en cualquier componente React

lib/auth/protected-route.ts
    export async function protectedRoute() {
      const session = await getSession()
      if (!session) {
        throw redirect({ to: "/login" })
      }
      return session
    }

asi protegemos la ruta:
    loader: async () => {
        await protectedRoute()
        return {}
      },

lib/auth/protected-serverFn.ts
    export async function protectedServerFn(request: Request) {
      const session = await auth.api.getSession({
        headers: request.headers,
      })
      if (!session) {
        throw new Response("Unauthorized", { status: 401 })
      }
      return session
    }

asi protegemos las funciones del servidor:
    export const getCategoriesServer = createServerFn({ method: "GET" }).handler(
      async () => {
        const request = getRequest()
        const session = await protectedServerFn(request)
        return await getCategoriesDB(session.user.id)
      }
    )


(empezamos con el UI, y los forms de shadcn)
==============================

1️⃣.1️⃣4️⃣ instalamos la opcion de shadcn para formulario de login
  
    pnpm dlx shadcn@latest add login-03 field

1️⃣.1️⃣5️⃣ agregamos el Toaster al __root.tsx  

1️⃣.1️⃣6️⃣ login.tsx

const formSchema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(8, "Contraseña mínima de 8 caracteres."),
})

export function LoginForm({
  const [loading, setLoading] = useState(false)
  const form = useForm({
		defaultValues: {},
		validators: {onSubmit: formSchema,},
		onSubmit: async ({ value }) => {
       await authClient.signIn.email()
    },
	})

  const signIn = async () => {
    await authClient.signIn.social()
  }

  return (
      <form
						id="login-form"
						onSubmit={e => {
							e.preventDefault()
							form.handleSubmit()
						}}
					>
          ...
          </form>
  )

1️⃣.1️⃣7️⃣ register.tsx

1️⃣.1️⃣8️⃣ Header.tsx
    export default async function Header() {
      const [theme, setTheme] = useState<"light" | "dark">("light")
      const { session } = useLoaderData({ from: "__root__" })

      const toggleTheme = () => {}

      return (
        { session ? () : () }
      )
    }


TANSTACK QUERY
----------------------
2️⃣.0️⃣ instalacion

    pnpm dlx @tanstack/react-query@latest

2️⃣.1️⃣ queries/query-client.ts
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

2️⃣.2️⃣ router.tsx
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

2️⃣.3️⃣ __root.tsx

    function RootDocument({ children }: { children: React.ReactNode }) {
      const queryClient = getQueryClient()

      return (
        
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
      )
    }

2️⃣.4️⃣ queries/items/items-query.ts
    export const itemsQueryOptions = queryOptions({
      queryKey: ["items"],
      queryFn: () => getItemsServer(),
      refetchInterval: 60 * 1000, // refrescar cada 60 segundos
    })

    export const itemQueryOptions = (itemId: string) => {
      const queryClient = useQueryClient()
      return queryOptions({
        queryKey: ["item", itemId],

        queryFn: () => getItemByIdServer({ data: { itemId } }), // BACKUP

        initialData: () => {
          const items = queryClient.getQueryData<ItemWithCategoryType[]>(["items"])
          return items?.find(item => item.id === itemId)
        },
      })
    }

idem para categories    