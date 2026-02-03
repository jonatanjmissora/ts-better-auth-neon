import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <section className="p-20 flex flex-col justify-center items-center">
      <h1>Home</h1>
    </section>
  )
}
