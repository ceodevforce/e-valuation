import {eventHandler, H3Event, H3Error, sendError, createError, defineEventHandler, readBody} from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export const signUpWithSupabase = defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)
    const {email, password} = await readBody<{ email: string, password: string }>(event)

    if (!email || !password) {
      throw createError('Invalid credentials')
    }
    await client.auth.signUp({
      email, password
    })
    setResponseStatus(event, 200, 'User successfully registered')
    return {
      message: 'Sign up!!'
    }
  } catch (e) {
    console.error(e)
    // @ts-ignore
    return sendError(event, e)
  }
})

export const signInWithSupabase = defineEventHandler(async (event) => {
   try {
    const client = await serverSupabaseClient(event)
    const {email, password} = await readBody<{ email: string, password: string }>(event)

    if (!email || !password) {
      throw createError('Invalid credentials')
    }
   const { data: user,  error } = await client.auth.signInWithPassword({
      email, password
    })

     if (error) {
       throw createError(error)
     }
     event.context.evalUser = user
    setResponseStatus(event, 200, 'User successfully signing')
    return {
      message: 'Success user logged in',
      user
    }
  } catch (e) {
    console.error(e)
    // @ts-ignore
    return sendError(event, e)
  }
})
