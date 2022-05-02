import { z } from 'zod'

export const ElementalAffinitySchema = z.enum([
  'slash',
  'pierce',
  'impact',
  'fire',
  'ice',
  'lightning',
  'arcane',
])

export type ElementalAffinity = z.TypeOf<typeof ElementalAffinitySchema>

export const StatsSchema = z.object({
  strength: z.number(),
  dexterity: z.number(),
  agility: z.number(),
  wits: z.number(),
})
