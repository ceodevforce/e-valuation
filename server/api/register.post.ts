import {signUpWithSupabase} from '~/server/events/auth'
import {H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    setResponseStatus(event, 201, 'User created!')
      return await signUpWithSupabase(event)
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong!'
    })
  }
})
