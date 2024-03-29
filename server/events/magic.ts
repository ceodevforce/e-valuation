import { serverSupabaseClient } from '#supabase/server'
import {H3Event, H3Error, defineEventHandler, sendError} from 'h3'

export const signInWithMagicLinkSupabase = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  try {
    const { email } = await readBody<{email: string}>(event)
    await client.auth.signInWithOtp({
      email
    })
    setResponseStatus(event, 200, 'Success User')
    return {
      message: 'Check your email for activation'
    }
  } catch (e) {
    console.error(e)
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Something went wrong'
    }))
  }
})

export const signInWithOTPSupabase = (event: H3Event) => {

}


