import { z } from 'zod'

import { StatsSchema } from './core'

export const CharacterSchema = z.object({
  name: z.string(),
  level: z.number(),
  stats: StatsSchema,
})

export type Character = z.TypeOf<typeof CharacterSchema>
