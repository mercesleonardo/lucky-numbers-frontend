<template>
  <header class="bg-blue-700 text-white shadow-md">
    <nav class="container mx-auto flex items-center justify-between py-4 px-6">
      <div class="text-2xl font-bold tracking-wide">
        Lucky Numbers
      </div>
      <ul class="flex gap-6 text-lg font-medium">
        <li>
          <router-link to="/" class="hover:text-yellow-300 transition">Home</router-link>
        </li>
        <li>
          <router-link to="/megasena" class="hover:text-yellow-300 transition">Mega-Sena</router-link>
        </li>
        <li>
          <router-link to="/quina" class="hover:text-yellow-300 transition">Quina</router-link>
        </li>
        <li>
          <router-link to="/lotofacil" class="hover:text-yellow-300 transition">Lotofácil</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Nenhuma lógica por enquanto
</script>
