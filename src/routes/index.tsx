import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <section className='flex flex-col'>
      <Header />
      <span className='font-bold text-4xl p-20'>HOME PAGE</span></section>
  )
}
