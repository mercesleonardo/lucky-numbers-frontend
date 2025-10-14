<template>
  <div class="bg-gray-100 rounded-xl shadow-md p-4 flex flex-col items-center gap-2 w-full max-w-xs mx-auto">
    <div class="text-lg font-semibold text-blue-700">{{ title }}</div>
    <div class="flex flex-wrap justify-center gap-1 mt-2">
      <span v-for="(num, idx) in numbers" :key="idx"
        class="bg-blue-200 text-blue-900 rounded-full px-3 py-1 text-sm font-bold">
        {{ num }}
      </span>
    </div>
    <div class="text-xs text-gray-500 mt-2">Concurso: {{ contest }} | Data: {{ date }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  numbers: number[]
  contest: string | number
  date: string
}>()
</script>
