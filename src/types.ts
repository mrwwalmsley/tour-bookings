import type { Timestamp } from 'firebase/firestore'
import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Booking {
  date: Timestamp
  times: Record<string, number>
}
export interface Event {
  name: string
  days: Booking[]
}
