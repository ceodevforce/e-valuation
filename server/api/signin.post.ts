import {signInWithSupabase} from '~/server/events/auth'

export default eventHandler(async (event) => {
  try {
      return await signInWithSupabase(event)
  } catch (err) {
    console.log(err)
    throw createError({
      statusMessage: 'Something went wrong',
      statusCode: 500
    })
  }
})
