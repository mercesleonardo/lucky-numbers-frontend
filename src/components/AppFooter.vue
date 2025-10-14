<script setup lang="ts">
// Substitua estes por seus links reais
const githubUrl = 'https://github.com/mercesleonardo';
const linkedinUrl = 'https://www.linkedin.com/in/mercesleonardo/';
</script>

<template>
  <footer class="bg-gray-800/80 border-t border-gray-700 py-6 mt-12 backdrop-blur-md">
    <div class="container mx-auto px-4 text-center">

      <p class="text-sm text-gray-400 font-medium">
        Criado por
        <span class="text-teal-400 font-bold">Leonardo Carvalho</span>.
        Todos os direitos reservados &copy; {{ new Date().getFullYear() }}.
      </p>

      <div class="mt-4 flex justify-center space-x-6">

        <a :href="githubUrl" target="_blank" rel="noopener noreferrer"
          class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-semibold hover:underline">
          GitHub
        </a>

        <span class="text-gray-600">|</span>

        <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer"
          class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-semibold hover:underline">
          LinkedIn
        </a>
      </div>

    </div>
  </footer>
</template>
