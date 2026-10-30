import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="mt-4 text-slate-600">This page does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-primary underline">
        Back to home
      </Link>
    </section>
  )
}
