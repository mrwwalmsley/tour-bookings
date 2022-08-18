<script setup lang="ts">
import { Timestamp } from 'firebase/firestore'
import { setEvent, useEvent } from '~/composables/db'
import type { Booking } from '~/types'

const tours = reactive({
  name: 'Hamilton Open House',
  startDate: '2022-09-27',
  days: '21',
  startTime: '9:00',
  endTime: '19:00',
  interval: '15',
  perDay: '31',
  size: '160',
})

const event = await useEvent('hamilton-2022')

const router = useRouter()
const handleClick = () => {
  const days: Booking[] = []
  const startDate = new Date(`${tours.startDate} ${tours.startTime}`)
  const lastTourTime = new Date(`${tours.startDate} ${tours.endTime}`)

  const interval = Number(tours.interval)
  const toursPerDay = Math.floor((lastTourTime.getTime() - startDate.getTime()) / 1000 / 60 / interval)
  const eventDays = Number(tours.days)

  for (let dayNum = 0; dayNum < eventDays; dayNum++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + dayNum)

    const times: Record<string, number> = {}
    for (let tourNum = 0; tourNum < toursPerDay; tourNum++) {
      const time = new Date(startDate)
      time.setMinutes(time.getMinutes() + interval * tourNum)

      const timeString = time.toLocaleTimeString('en', {
        hour12: false,
        minute: '2-digit',
        hour: '2-digit',
      })

      times[timeString] = Number(tours.size)
    }

    days.push({
      date: Timestamp.fromDate(currentDate),
      times,
    })
  }

  const data = {
    name: 'Hamilton Open House',
    days,
  }
  setEvent('hamilton-2022', data)
  router.push('/')
}

const getDateString = (timestamp: Timestamp) => timestamp.toDate().toLocaleString('en', {
  month: 'short',
  weekday: 'short',
  day: 'numeric',
})
</script>

<template>
  <div>
    <img
      mx-auto
      src="logo.png"
      width="150"
    >

    <h1>Admin</h1>
    <p>
      Create tour schedule
    </p>

    <div py-4 />

    <div grid grid-cols-2 gap-4 items-center>
      <Input
        v-model="tours.name" label="Name"
      />
      <Input
        v-model="tours.startDate" label="Start Date"
      />
      <Input
        v-model="tours.days" label="Total Days"
      />
      <Input
        v-model="tours.startTime" label="First Time"
      />
      <Input
        v-model="tours.endTime" label="Last Time"
      />
      <Input
        v-model="tours.interval" label="Tour Interval"
      />
      <Input
        v-model="tours.size" label="Tour Size"
      />
    </div>

    <div>
      <button
        btn m-6 py-2 px-4 text-sm
        @click="handleClick"
      >
        Create Tours
      </button>
    </div>

    <div py-4 />

    <div v-for="booking in event?.days" :key="booking.date.seconds">
      {{ getDateString(booking.date) }}
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
