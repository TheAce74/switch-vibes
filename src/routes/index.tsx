import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Switch Vibes</h1>
    </main>
  )
}
