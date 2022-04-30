<script setup lang="ts">

import type { Timestamp } from 'firebase/firestore'
import { useEvent } from '~/composables/db'

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

const { t } = useI18n()
</script>

<template>
  <div>
    <img
      mx-auto
      src="icon.webp"
      width="150"
    >

    <p>{{ t('intro.title') }}</p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <div v-for="booking in event?.bookings" :key="booking.date.seconds">
      {{ getDateString(booking.date) }}
    </div>

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
