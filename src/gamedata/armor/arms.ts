import { createArmorPart } from 'utils/armor'

const create = createArmorPart('arms')

// Armor parts

export const armArmor = {
  leatherGloves: create({
    name: 'Leather gloves',
    adjective: 'Padded',
    namingPriority: 3,
    weight: 1,
    defense: 1,
    resist: ['lightning'],
    layers: ['bottom']
  })
}
