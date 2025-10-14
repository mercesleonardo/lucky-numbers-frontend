<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  title: string;
  numbers: number[];
  contest: string | number;
  date: string;
  // Nova prop para aplicar a cor do jogo
  colorClass: string;
  // Nova prop para o nome da rota
  routeName: string;
}>();

// Calcula a classe do botão/tag baseado na cor principal
const buttonClass = computed(() => {
  // Exemplo: 'bg-green-600 hover:bg-green-700'
  return `mt-4 inline-block text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105 ${props.colorClass}`;
});
</script>

<template>
  <div
    class="p-6 rounded-xl backdrop-blur-md bg-gray-800/60 border border-gray-700 shadow-2xl transition-all duration-300 hover:shadow-teal-500/30">

    <div :class="['text-2xl font-extrabold mb-3 text-center', `text-${props.colorClass.split('-')[1]}-400`]">
      {{ title }}
    </div>

    <div class="text-sm text-gray-400 text-center mb-5">
      Concurso {{ contest }} | {{ date }}
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <span v-for="(num, idx) in numbers" :key="idx" :class="[
        'flex items-center justify-center w-10 h-10 rounded-full text-base font-extrabold text-gray-900 shadow-inner',
        // Cor do fundo do número baseada na cor do jogo
        `bg-${props.colorClass.split('-')[1]}-400`
      ]">
        {{ String(num).padStart(2, '0') }}
      </span>
    </div>

    <div class="text-center">
      <RouterLink :to="{ name: routeName }" :class="buttonClass">
        Ver Detalhes do Jogo
      </RouterLink>
    </div>
  </div>
</template>
