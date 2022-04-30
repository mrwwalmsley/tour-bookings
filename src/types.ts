import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

type Booking = {
  date: string
} & Record<string, number>
export interface Events {
  name: string
  bookings: Booking[]
}
