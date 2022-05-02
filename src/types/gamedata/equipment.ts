import { armArmor, headArmor, legArmor, torsoArmor } from 'gamedata'
import { z } from 'zod'

import { ElementalAffinitySchema } from './core'

export const ArmorSlotSchema = z.enum([
  'head',
  'torso',
  'legs',
  'arms',
])

export type ArmorSlot = z.TypeOf<typeof ArmorSlotSchema>

export const ArmorPartSchema = z.object({
  name: z.string(),
  adjective: z.string(),
  namingPriority: z.number(),
  slot: ArmorSlotSchema,
  weight: z.number(),
  defense: z.number(),
  resist: z.array(ElementalAffinitySchema),
  weak: z.array(ElementalAffinitySchema),
  layers: z.array(z.enum(['top', 'middle', 'bottom']))
})

export type ArmorPart = z.TypeOf<typeof ArmorPartSchema>
export type ArmorLayer = ArmorPart['layers'][number]

const fetchPart = <L extends Record<string, ArmorPart>>(
  list: L,
  layer: ArmorLayer,
): ArmorPart | null=> {
  return list[layer] ?? null
}

const armorList = (slot: ArmorSlot) => ({
  head: headArmor,
  torso: torsoArmor,
  legs: legArmor,
  arms: armArmor
}[slot])

export const ArmorSchema = z.object({
  slot: ArmorSlotSchema,
  layers: z.object({
    top: z.nullable(z.string()),
    middle: z.nullable(z.string()),
    bottom: z.nullable(z.string()),
  })
// Validate if armor key exists and has valid slots
}).refine(armor => {
  const list: Record<string, ArmorPart> = armorList(armor.slot)
  return (
    Object.entries(armor.layers)
      .reduce<boolean>((cond, [layer, partKey]) => {
        if (!partKey || !cond) {
          return cond
        }

        const part = list[partKey]

        return !!part
          && part.slot === armor.slot
          && (part.layers as string[]).includes(layer)
      }, true)
  )
})

export type Armor = z.TypeOf<typeof ArmorSchema>

export const MeleeWeaponSchema = z.object({
  name: z.string(),
  category: z.enum([
    'sword',
    'spear',
    'axe',
    'mace',
    'dagger',
    'staff',
  ]),
  weight: z.number(),
  damages: z.array(z.object({
    element: ElementalAffinitySchema,
    value: z.number(),
  })).refine(d => d.length > 0)
})

export type MeleeWeapon = z.TypeOf<typeof MeleeWeaponSchema>

export const RangedWeaponSchema = z.object({
  name: z.string(),
  category: z.enum([
    'bow',
    'crossbow',
    'pistol',
    'crossbow',
  ]),
  weight: z.number(),
  range: z.number(),
  damages: z.array(z.object({
    element: ElementalAffinitySchema,
    value: z.number(),
  })).refine(d => d.length > 0)
})

export type RangedWeapon = z.TypeOf<typeof RangedWeaponSchema>
