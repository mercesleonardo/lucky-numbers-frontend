<template>
    <GameLayout>
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Lotofácil</h2>
        <ResultCard title="Lotofácil" :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]" contest="2950"
            date="14/10/2025" />
        <!-- Adicione mais informações ou funcionalidades específicas da Lotofácil aqui -->
    </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from '@/components/GameLayout.vue'
import ResultCard from '@/components/ResultCard.vue'
</script>
