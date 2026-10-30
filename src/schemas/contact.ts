import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
