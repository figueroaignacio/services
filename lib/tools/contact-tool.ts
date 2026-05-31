import { sendEmail } from '@/app/actions/send-email'
import { tool, UIToolInvocation } from 'ai'
import { z } from 'zod'

export const submitContactRequest = tool({
  description:
    'Submits a contact inquiry or website request to Ignacio on behalf of the user.',
  inputSchema: z.object({
    name: z.string().describe('The full name of the user.'),
    email: z.string().email().describe('The email address of the user.'),
    message: z
      .string()
      .describe(
        'The details of the website they want, their project requirements, or their question.',
      ),
  }),
  execute: async ({ name, email, message }) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('message', message)

      const result = await sendEmail(formData)

      if (result.success) {
        return {
          success: true,
          message:
            'Contact request sent successfully! Ignacio has been notified and will respond via email within 24 hours.',
        }
      } else {
        return {
          success: false,
          error:
            result.error ||
            'Failed to send email. Please try again or email directly.',
        }
      }
    } catch (e: unknown) {
      console.error('Error executing submitContactRequest tool:', e)
      return {
        success: false,
        error:
          (e as Error).message ||
          'An unexpected error occurred while sending the message.',
      }
    }
  },
})

export type SubmitContactRequestInvocation = UIToolInvocation<
  typeof submitContactRequest
>
