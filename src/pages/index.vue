<script setup lang="ts">

import type { Timestamp } from 'firebase/firestore'
import { useEvent } from '~/composables/db'
import type { Booking } from '~/types'

const groupSize = ref()
const event = await useEvent('hamilton-2022')

const router = useRouter()
const go = () => {
  router.push('/booking')
}

const getDateString = (timestamp: Timestamp) => timestamp.toDate().toLocaleString('en', {
  month: 'short',
  weekday: 'short',
  day: 'numeric',
})

const getHours = (day: Booking) => {
  const times = Object.entries(day.times).sort((entry1, entry2) => {
    return entry1[0].localeCompare(entry2[0])
  })

  const startHour = Number(times[0][0].split(':')[0])

  const result: Record<string, number> = {}
  times.forEach(([time, count]) => {
    const hour = Math.floor((Number(time.split(':')[0]) - startHour) / 2)
    result[hour] = (result[hour] || 0) + count
  })
  return result
}

const { t } = useI18n()
</script>

<template>
  <div>
    <img
      mx-auto
      src="logo.png"
      width="150"
    >

    <p>{{ t('intro.title') }}</p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <div grid mx-auto w-120 gap-1 cursor-pointer style="grid-template-columns: auto repeat(5, 1fr)">
      <div v-for="(day, index) in event?.days" :key="day.date.seconds" class="group" contents>
        <span pr-2 text-right whitespace-nowrap leading-8 :class="`row-start-${index + 1}`">{{ getDateString(day.date) }}</span>
        <span
          v-for="(count, time) in getHours(day)" :key="time"
          :title="time" :class="`row-start-${index + 1}`"
          rd-1 bg="blue-2"
          text-xs c-transparent leading-8
          group-hover:c-white
        >{{ count }}
        </span>
      </div>
    </div>
    <div py-4 />

    <input
      id="input"
      v-model="groupSize"
      :placeholder="t('intro.group-size-label')"
      :aria-label="t('intro.group-size-label')"
      type="number"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.group-size-label') }}</label>

    <div>
      <button
        btn m-3 text-sm
        :disabled="!groupSize"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
