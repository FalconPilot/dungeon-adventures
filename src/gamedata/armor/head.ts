import { createArmorPart } from 'utils/armor'

const create = createArmorPart('head')

// Armor parts

export const headArmor = {
  leatherGloves: create({
    name: 'Leather cap',
    adjective: 'Padded',
    namingPriority: 3,
    weight: 1,
    defense: 1,
    resist: ['lightning'],
    layers: ['bottom']
  })
}
