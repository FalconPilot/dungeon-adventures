import { createArmorPart } from 'utils/armor'

const create = createArmorPart('legs')

// Armor parts

export const legArmor = {
  ironLegs: create({
    name: 'Iron leggings',
    adjective: 'Plated',
    namingPriority: 5,
    weight: 2,
    defense: 1,
    weak: ['lightning'],
    resist: ['fire'],
    layers: ['top', 'middle'],
  }),
  leatherPants: create({
    name: 'Leather pants',
    adjective: 'Padded',
    namingPriority: 3,
    weight: 1,
    defense: 1,
    resist: ['lightning'],
    layers: ['bottom']
  }),
}
