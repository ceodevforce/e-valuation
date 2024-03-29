import {signInWithMagicLinkSupabase} from '~/server/events/magic'

export default defineEventHandler(async (event) => {
  return await signInWithMagicLinkSupabase(event)
})
