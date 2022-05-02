import { armArmor, headArmor, legArmor, torsoArmor } from 'gamedata'
import { Armor, ArmorPart, ArmorSlot, ElementalAffinity, GameData } from 'types'

// Internal utils

export const createArmorPart = (
  slot: ArmorSlot,
) => (opts: Partial<ArmorPart>): ArmorPart => ({
  name: 'UNDEFINED_NAME',
  adjective: 'UNDEFINED_ADJECTIVE',
  namingPriority: 99,
  slot,
  weight: 0,
  defense: 0,
  resist: [],
  weak: [],
  layers: [],
  ...opts,
})

export const getArmorPart = (
  slot: ArmorSlot,
) => (
  key: string | null
): ArmorPart | null => {
  if (!key) {
    return null
  }

  const list: Record<string, ArmorPart> = {
    head: headArmor,
    torso: torsoArmor,
    legs: legArmor,
    arms: armArmor,
  }[slot]

  return list[key] ?? null
}


export const getArmorName = (armor: Armor): string => ([
  armor.layers.bottom,
  armor.layers.middle,
  armor.layers.top,
].map(getArmorPart(armor.slot)).sort((l1, l2) => {
  const p1 = l1?.namingPriority ?? 99
  const p2 = l2?.namingPriority ?? 99

  return p1 < p2 ? -1 : 1
}).reduce<string[]>((acc, part) => {
  // If layer is empty, skip it
  if (!part) {
    return acc
  }

  // If layer is first detected, use it as base name
  if (acc.length === 0) {
    return [part.name]
  }

  // If layer is identical to previous one, alter it
  if (part.adjective === acc[acc.length - 1]) {
    return acc.slice(0, -1).concat([`Double-${part.adjective}`])
  }

  return acc.concat([part.adjective])
}, []).reverse().join(' '))

export const getArmorDefense = (armor: Armor): number =>
  Object.values(armor.layers)
    .map(getArmorPart(armor.slot))
    .reduce((total, part) => (
      total + (part?.defense ?? 0)
    ), 0)

export const getArmorWeight = (armor: Armor): number =>
  Object.values(armor.layers)
    .map(getArmorPart(armor.slot))
    .reduce((total, part) => (
      total + (part?.weight ?? 0)
    ), 0)

const eltPercent = 10

export const getTotalResistance = (
  equipment: GameData['equipment']['armor']
): Record<ElementalAffinity, number> => (
  (['head', 'torso', 'legs', 'arms'] as const)
    .reduce((acc, slot) => {
      const armor = equipment[slot]

      if (!armor) {
        return acc
      }

      const parts = Object.values(armor.layers)
        .map(getArmorPart(slot))
        .reduce<{
          resist: ElementalAffinity[],
          weak: ElementalAffinity[]
        }>((map, part) => {
          if (!part) {
            return map
          }

          return {
            resist: map.resist.concat(part.resist),
            weak: map.weak.concat(part.weak)
          }
        }, {
          resist: [],
          weak: []
        })

      return Object.entries(acc)
        .reduce((newAcc, [element, res]) => {
          return {
            ...newAcc,
            [element]: res
              + parts.resist.filter(r => r === element).length * eltPercent
              - parts.weak.filter(r => r === element).length * eltPercent
          }
        }, acc)
    }, {
      slash: 0,
      pierce: 0,
      impact: 0,
      fire: 0,
      ice: 0,
      lightning: 0,
      arcane: 0,
    })
)

export const getPartRarity = (part: ArmorPart): number =>
  part.defense * 4
    + part.resist.length * 10
    - part.weak.length * 6
    - part.weight * 2
