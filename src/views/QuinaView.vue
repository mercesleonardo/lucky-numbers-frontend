<template>
    <GameLayout>
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Quina</h2>
        <ResultCard title="Quina" :numbers="[3, 18, 27, 44, 72]" contest="6123" date="13/10/2025" />
        <!-- Adicione mais informações ou funcionalidades específicas da Quina aqui -->
    </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from '@/components/GameLayout.vue'
import ResultCard from '@/components/ResultCard.vue'
</script>
