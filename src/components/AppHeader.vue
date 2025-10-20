<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import { useLottery } from '../services/useLottery';

// 1. Lógica para controle do menu mobile
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 2. Obtenção de dados dos jogos
const { gamesInfo } = useLottery();

// 3. Geração dinâmica dos itens de navegação
const navItems = computed(() => {
  const items = [{ name: 'Home', routeName: 'home' }];
  if (gamesInfo.value) {
    for (const slug in gamesInfo.value.supported_games) {
      items.push({
        name: gamesInfo.value.supported_games[slug].name,
        routeName: slug,
      });
    }
  }
  return items;
});

// 4. Classes de estilo para os links
const baseLinkClasses = 'rounded-md px-3 py-2 text-sm font-medium transition-colors';
const inactiveClasses = 'text-gray-300 hover:bg-white/5 hover:text-white';
const activeClasses = 'bg-gray-950/50 text-white';
</script>

<template>
  <nav
    class="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md shadow-lg after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">

    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">

        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button @click="toggleMobileMenu" type="button" :aria-expanded="isMobileMenuOpen"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>

            <svg v-if="!isMobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
              aria-hidden="true" class="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"
              class="size-6">
              <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <RouterLink :to="{ name: 'home' }">
              <img src="/src/assets/lucky-numbers.png" alt="LuckyNumbers"
                class="h-8 w-auto" />
            </RouterLink>
          </div>

          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">

              <RouterLink v-for="item in navItems" :key="item.routeName" :to="{ name: item.routeName }"
                :class="[baseLinkClasses, inactiveClasses]" :active-class="activeClasses">
                {{ item.name }}
              </RouterLink>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">

        <RouterLink v-for="item in navItems" :key="item.routeName" :to="{ name: item.routeName }"
          @click="toggleMobileMenu" :class="['block', baseLinkClasses, 'text-base', inactiveClasses]"
          :active-class="activeClasses">
          {{ item.name }}
        </RouterLink>

      </div>
    </div>
  </nav>
</template>