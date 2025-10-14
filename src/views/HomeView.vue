<script setup lang="ts">
import ResultCard from '@/components/ResultCard.vue'
</script>

<template>
  <main class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">Últimos Resultados</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <ResultCard title="Mega-Sena" :numbers="[6, 12, 23, 34, 45, 56]" contest="2678" date="12/10/2025">
        <router-link to="/megasena"
          class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Ver
          Mega-Sena</router-link>
      </ResultCard>
      <ResultCard title="Quina" :numbers="[3, 18, 27, 44, 72]" contest="6123" date="13/10/2025">
        <router-link to="/quina"
          class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Ver
          Quina</router-link>
      </ResultCard>
      <ResultCard title="Lotofácil" :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]" contest="2950"
        date="14/10/2025">
        <router-link to="/lotofacil"
          class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Ver
          Lotofácil</router-link>
      </ResultCard>
    </div>
  </main>
</template>
