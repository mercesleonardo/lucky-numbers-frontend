<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  title: string;
  numbers: number[];
  contest: string | number;
  date: string;
  colorClass: string;
  routeName: string;
}>();

const formattedDate = computed(() => {
  if (!props.date) return '';
  // Adicionado timeZone: 'UTC' para evitar que a data mude baseada no fuso horário do usuário
  return new Date(props.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });
});

// Calcula a classe do botão/tag baseado na cor principal
const buttonClass = computed(() => {
  return `mt-4 inline-block text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105 ${props.colorClass}`;
});
</script>

<template>
  <div
    class="p-6 h-full flex flex-col rounded-xl backdrop-blur-md bg-gray-800/60 border border-gray-700 shadow-2xl transition-all duration-300 hover:shadow-teal-500/30">

    <div :class="['text-2xl font-extrabold mb-3 text-center', `text-${props.colorClass.split('-')[1]}-400`]">
      {{ title }}
    </div>

    <div class="text-sm text-gray-400 text-center mb-5">
      Concurso {{ contest }} | {{ formattedDate }}
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-2">
      <span v-for="(num, idx) in numbers" :key="idx" :class="[
        'flex items-center justify-center w-10 h-10 rounded-full text-base font-extrabold text-gray-900 shadow-inner',
        props.colorClass
      ]">
        {{ String(num).padStart(2, '0') }}
      </span>
    </div>

    <div class="flex-1"></div>

    <div class="text-center mt-2">
      <RouterLink :to="{ name: routeName }" :class="buttonClass">
        Criar jogos pelo simulador
      </RouterLink>
    </div>
  </div>
</template>
