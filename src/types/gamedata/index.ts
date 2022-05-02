import { z } from 'zod'

import { legArmor, torsoArmor } from 'gamedata'

import { CharacterSchema } from './character'

import {
  ArmorSchema,
  MeleeWeaponSchema,
  RangedWeaponSchema,
} from './equipment'

export * from './character'
export * from './core'
export * from './equipment'
export * from './item'

// Complete GameData state
export const GameDataSchema = z.object({
  character: CharacterSchema,
  equipment: z.object({
    weapons: z.object({
      melee: z.nullable(MeleeWeaponSchema),
      ranged: z.nullable(RangedWeaponSchema)
    }),
    armor: z.object({
      head: z.nullable(ArmorSchema.refine(a => a.slot === 'head')),
      torso: z.nullable(ArmorSchema.refine(a => a.slot === 'torso')),
      legs: z.nullable(ArmorSchema.refine(a => a.slot === 'legs')),
      arms: z.nullable(ArmorSchema.refine(a => a.slot === 'arms')),
    }),
  }),
  inventory: z.array(z.union([
    ArmorSchema,
    MeleeWeaponSchema,
    RangedWeaponSchema,
  ]))
})

export type GameData = z.TypeOf<typeof GameDataSchema>
