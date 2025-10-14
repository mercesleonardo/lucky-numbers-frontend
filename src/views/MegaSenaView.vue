<template>
    <GameLayout>
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Mega-Sena</h2>
        <ResultCard title="Mega-Sena" :numbers="[6, 12, 23, 34, 45, 56]" contest="2678" date="12/10/2025" />
        <!-- Aqui você pode adicionar mais informações ou funcionalidades específicas da Mega-Sena -->
    </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from '@/components/GameLayout.vue'
import ResultCard from '@/components/ResultCard.vue'
</script>
