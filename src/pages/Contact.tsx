import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/schemas/contact'

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (values: ContactFormValues) => {
    // TODO: replace with api.post('/contact', values) once the backend is ready
    console.log('Contact form submitted', values)
    reset()
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register('fullName')} className={inputClass} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register('email')} className={inputClass} />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <input {...register('subject')} className={inputClass} />
        </Field>
        <Field label="Message" error={errors.message?.message}>
          <textarea rows={5} {...register('message')} className={inputClass} />
        </Field>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        {isSubmitSuccessful && <p className="text-green-700">Thank you! Your message was sent.</p>}
      </form>
    </section>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  )
}
