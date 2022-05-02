import { z } from 'zod'

export const InventoryItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
})
