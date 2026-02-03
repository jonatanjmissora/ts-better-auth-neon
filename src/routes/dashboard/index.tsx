import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <section className='p-20'><span className='font-bold text-4xl'>DASHBOARD</span></section>
}
