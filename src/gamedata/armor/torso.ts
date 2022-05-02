import { ArmorPart } from 'types'
import { createArmorPart } from 'utils/armor'

const create = createArmorPart('torso')

// Armor parts

export const torsoArmor = {
  ironCuirass: create({
    name: 'Iron cuirass',
    adjective: 'Plated',
    namingPriority: 0,
    weight: 3,
    defense: 3,
    weak: ['lightning'],
    resist: ['slash', 'pierce'],
    layers: ['top']
  }),
  ironPlate: create({
    name: 'Iron plate',
    adjective: 'Plated',
    namingPriority: 5,
    weight: 2,
    defense: 1,
    weak: ['lightning'],
    resist: ['slash'],
    layers: ['top', 'middle'],
  }),
  leatherGambeson: create({
    name: 'Leather gambeson',
    adjective: 'Padded',
    namingPriority: 3,
    weight: 2,
    defense: 1,
    resist: ['impact'],
    layers: ['bottom'],
  }),
  steelPlate: create({
    name: 'Steel plate',
    adjective: 'Plated',
    namingPriority: 5,
    weight: 3,
    defense: 2,
    weak: ['lightning'],
    resist: ['slash'],
    layers: ['top', 'middle'],
  }),
}
