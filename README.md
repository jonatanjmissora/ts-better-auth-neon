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
  1.1 - instalacion de librerias
  1.2 - variables de entorno relacionadas a better-auth y neon
  1.3 - auth.ts  donde configuramos el better auth
  1.4 - db/drizzle.ts   conexion a neon con su DATABASE_URL
  1.5 - db/schema.ts  vacio por el momento
  1.6 - drizzle.config.ts
  1.7 - generamos el schema de better-auth
  1.8 - hacemos el push a neon con      npx drizzle-kit push

  aqui ya tenemos la base de datos en neon y la tabla de better-auth
  conectemos las comunicaciones entre el frontend y neon, hagamos los login, logout)


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

2️⃣.0️⃣ routes/api/auth/$.ts

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

2️⃣.1️⃣ db/auth-client.ts

    import { createAuthClient } from "better-auth/react"
    export const authClient = createAuthClient({
        /** The base URL of the server (optional if you're using the same domain) */
        baseURL: "http://localhost:3000"
    })

2️⃣.2️⃣ lib/auth/route-middleware.ts

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

2️⃣.3️⃣ Otra opcion, con middleware mas controlados y especificos
--------------------------------------------------------------------------
src/server/getSession.ts

lib/auth/protected-route.ts

lib/auth/protected-serverFn.ts


empezamos con el UI, y los forms de shadcn
=============================================================

1️⃣6️⃣
  
    pnpm dlx shadcn@latest add login-03 field

16 - agregamos el Toaster al __root.tsx  

16 - routes/dashboard/route.tsx

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
      return <section className='p-20'><span className='font-bold text-4xl'>DASHBOARD</span></section>;
    }

1️⃣7️⃣ routes/login/route.tsx

    import { createFileRoute } from "@tanstack/react-router";
    import { LoginForm } from "@/components/login-form";
  
    export const Route = createFileRoute("/login")({
      component: RouteComponent,
    });
  
    function RouteComponent() {
      return (
        <section className="w-screen sm:pt-10 2xl:pt-30 flex flex-col justify-center items-center">
          <LoginForm />
        </section>
      );
    }

1️⃣8️⃣ routes/register/route.tsx

    import { createFileRoute } from "@tanstack/react-router"
    import { RegisterForm } from "@/components/register-form"
  
    export const Route = createFileRoute("/register")({
      component: RouteComponent,
    })
  
    function RouteComponent() {
      return (
        <section className="w-screen sm:pt-10 2xl:pt-30 flex flex-col justify-center items-center">
          <RegisterForm />
        </section>
      )
    }

1️⃣9️⃣ components/login-form.tsx

    import { useForm } from "@tanstack/react-form"
    import { toast } from "sonner"
    import * as z from "zod"
    import { Button } from "@/components/ui/button"
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"
    import {
      Field,
      FieldDescription,
      FieldError,
      FieldGroup,
      FieldLabel,
      FieldSeparator,
    } from "@/components/ui/field"
    import { Input } from "@/components/ui/input"
    import { cn } from "@/lib/utils"
    import { authClient } from "lib/auth/auth-client"
    import { Link } from "@tanstack/react-router"
  
    const formSchema = z.object({
      email: z.email("Email inválido"),
      password: z.string().min(8, "Contraseña mínima de 8 caracteres."),
    })
  
    export function LoginForm({
      className,
      ...props
    }: React.ComponentProps<"div">) {
      const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        validators: {
          onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
          await authClient.signIn.email(
            {
              email: value.email,
              password: value.password,
              callbackURL: "/dashboard",
            },
            {
              onSuccess: () => {
                toast.success("Login exitoso")
              },
              onError: ctx => {
                toast.error(ctx.error.message)
              },
            }
          )
        },
      })
  
      const signIn = async () => {
      return await authClient.signIn.social({
        provider: "google",
      callbackURL: "/dashboard",
      });
    };
  
      return (
        <div className={cn("min-w-1/4 flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
              <CardDescription>Ingresa con una cuenta de Google</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="login-form"
                onSubmit={e => {
                  e.preventDefault()
                  form.handleSubmit()
                }}
              >
                <FieldGroup>
                  <Field>
                    <Button variant="outline" type="button" onClick={signIn}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Google</title>
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Google
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    O continua con
                  </FieldSeparator>
  
                  <form.Field
                    name="email"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="m@example.com"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
  
                  <form.Field
                    name="password"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="********"
                            type="password"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
  
                  <Field>
                    <Button type="submit">Ingresar</Button>
                    <FieldDescription className="text-center">
                      No tiene cuenta ? <Link to="/register">Registrate</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      )
    }

2️⃣0️⃣ components/register-form.tsx

    import { useForm } from "@tanstack/react-form"
    import { toast } from "sonner"
    import * as z from "zod"
    import { Button } from "@/components/ui/button"
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"
    import {
      Field,
      FieldDescription,
      FieldError,
      FieldGroup,
      FieldLabel,
      FieldSeparator,
    } from "@/components/ui/field"
    import { Input } from "@/components/ui/input"
    import { cn } from "@/lib/utils"
    import { authClient } from "lib/auth/auth-client"
    import { Link } from "@tanstack/react-router"
  
    const formSchema = z.object({
      nombre: z.string().min(3, "Nombre mínimo de 3 caracteres."),
      email: z.email("Email inválido"),
      password: z.string().min(8, "Contraseña mínima de 8 caracteres."),
    })
  
    export function RegisterForm({
      className,
      ...props
    }: React.ComponentProps<"div">) {
      const form = useForm({
        defaultValues: {
          nombre: "",
          email: "",
          password: "",
        },
        validators: {
          onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
          await authClient.signUp.email(
            {
              email: value.email,
              password: value.password,
              name: value.nombre,
              callbackURL: "/dashboard",
            },
            {
              onSuccess: () => {
                toast.success("Registro exitoso")
              },
              onError: ctx => {
                toast.error(ctx.error.message)
              },
            }
          )
        },
      })
  
      return (
        <div className={cn("min-w-1/4 flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bienvenido a la app</CardTitle>
              <CardDescription>Ingresa con una cuenta de Google</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="register-form"
                onSubmit={e => {
                  e.preventDefault()
                  form.handleSubmit()
                }}
              >
                <FieldGroup>
                  <Field>
                    <Button variant="outline" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Google</title>
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Google
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    O continua con
                  </FieldSeparator>
  
                  <form.Field
                    name="nombre"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="ruben blada"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
  
                  <form.Field
                    name="email"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="m@example.com"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
  
                  <form.Field
                    name="password"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="********"
                            autoComplete="off"
                            type="password"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
  
                  <Field>
                    <Button type="submit">Registrar</Button>
                    <FieldDescription className="text-center">
                      Ya tienes cuenta ? <Link to="/login">Ingresar</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      )
    }

2️⃣1️⃣ components/header.tsx

    import { authClient } from "lib/auth/auth-client";
    import { Button } from "./ui/button";
    import { useNavigate } from "@tanstack/react-router";
  
    export default function Header() {
  
      const {data: session} = authClient.useSession();
      const navigate = useNavigate();
  
      const logout = async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              // Redirect to home page after successful logout
              navigate({ to: '/login' });
            }
          }
        });
      };
  
      return (
        <header className="p-4 px-20 bg-gray-800 text-white shadow-lg">
          <nav className="flex items-center justify-between">
            <span>Logo</span>
              {
                session 
                ? (
                <div className="flex items-center gap-4">
                  <span>Bienvenido {session.user.name}</span> 
                  <Button onClick={logout}>Log Out</Button>
                </div>
                )
                : <span>Not logged in</span>
              }
          </nav>
        </header>
      )
    }

2️⃣2️⃣ configurar el 
  
    GOOGLE_CLIENT_ID 
    GOOGLE_CLIENT_SECRET
  
dentro de https://console.cloud.google.com/apis/dashboard?project=ts-better-auth-neon

viendo el video https://www.youtube.com/watch?v=xqd51D3O53k&list=LL&index=8
minuto 35



