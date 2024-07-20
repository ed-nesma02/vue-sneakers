<script setup>
import { inject } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  title: String,
  description: String,
  imageUrl: String,
  size: Number,
  isCart: Boolean
});

const {cartController} = inject('cart');

</script>
<template>
  <div class="flex flex-col gap-5 items-center justify-center h-full">
    <img :height="size" :width="size" :src="imageUrl" alt="Информационная картинка" />
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p class="opacity-40 w-72 text-center">{{ description }}</p>
    <RouterLink
      v-if="!isCart"
      to="/"
      class="flex items-center gap-6 bg-[#9DD458] rounded-xl px-8 py-3 text-white font-bold mt-5"
    >
      <svg
        class="rotate-180"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Вернуться назад</span>
    </RouterLink>
    <button
      v-if="isCart"
      @click="cartController"
      class="flex items-center gap-6 bg-[#9DD458] rounded-xl px-8 py-3 text-white font-bold mt-5"
    >
      <svg
        class="rotate-180"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Вернуться назад</span>
    </button>
  </div>
</template>
