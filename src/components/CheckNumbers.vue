<script setup lang="ts">
import { ref } from 'vue';
import { useLottery } from '../services/useLottery';

const props = defineProps<{ gameSlug: string, color: string }>();

const { loading, error, checkUserNumbers } = useLottery();

const userNumbersInput = ref('');
const checkResult = ref<any>(null);
const checkError = ref<string | null>(null);

const handleCheck = async () => {
  checkResult.value = null;
  checkError.value = null;
  error.value = null;

  const numbers = userNumbersInput.value
    .split(/[,\s-]+/)
    .map(n => parseInt(n.trim(), 10))
    .filter(n => !isNaN(n));

  if (numbers.length === 0) {
    checkError.value = 'Por favor, insira os números do seu jogo.';
    return;
  }

  try {
    const result = await checkUserNumbers(props.gameSlug, numbers);
    checkResult.value = result;
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.error) {
      checkError.value = e.response.data.error;
    } else {
      checkError.value = 'Ocorreu um erro ao verificar seu jogo. Tente novamente.';
    }
  }
};

const colorClasses = {
    text: `text-${props.color}-400`,
    ring: `focus:ring-${props.color}-500`,
    border: `focus:border-${props.color}-500`,
    buttonBg: `bg-${props.color}-600`,
    buttonHoverBg: `hover:bg-${props.color}-700`,
};

</script>

<template>
  <section class="mt-12">
    <h2 class="text-3xl font-bold mb-6 border-b border-gray-700 pb-2" :class="colorClasses.text">Conferir Jogo</h2>
    <p class="mb-6 text-gray-400">
      Já tem um jogo em mente ou um bilhete antigo guardado? Insira os números abaixo e descubra se a sua combinação já foi sorteada em algum concurso anterior.
    </p>

    <div class="bg-gray-800 p-6 rounded-xl shadow-xl">
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label for="user-numbers" class="block mb-2 text-sm font-medium text-gray-300">Seus números</label>
          <input type="text" id="user-numbers" v-model="userNumbersInput"
            placeholder="Ex: 01, 02, 03, 04, 05, 06"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5" :class="[colorClasses.ring, colorClasses.border]">
          <p class="text-xs text-gray-400 mt-1">Separe os números por vı́rgula, espaço ou hífen.</p>
        </div>
      </div>

      <div class="text-center mt-6">
        <button @click="handleCheck" :disabled="loading"
          class="text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed" :class="[colorClasses.buttonBg, colorClasses.buttonHoverBg]">
          <span v-if="loading">Conferindo...</span>
          <span v-else :class="colorClasses.text">Conferir Jogo</span>
        </button>
      </div>

      <!-- Mensagem de Erro -->
      <div v-if="checkError" class="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">
        {{ checkError }}
      </div>

      <!-- Resultado -->
      <div v-if="checkResult" class="mt-6 text-center">
        <div v-if="checkResult.winner">
          <h3 class="text-xl font-bold text-green-400 mb-4">{{ checkResult.message }}</h3>
          <div class="space-y-4">
            <div v-for="contest in checkResult.contests" :key="contest.draw_number" class="bg-gray-700 p-4 rounded-lg">
              <p>Concurso <span class="font-bold">{{ contest.draw_number }}</span> ({{ new Date(contest.draw_date).toLocaleDateString('pt-BR') }})</p>
              <div v-if="contest.prizes && contest.prizes.length > 0">
                <p>Parabéns! Você acertou os números para a faixa de prêmio principal.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-lg text-gray-300">{{ checkResult.message }}</p>
          <p v-if="checkResult.suggestion" class="text-sm text-gray-400 mt-2">{{ checkResult.suggestion }}</p>
        </div>
      </div>

    </div>
  </section>
</template>
