<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  totalPrice: Number
});
const emit = defineEmits(['cartController']);
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-300 px-10 py-8">
    <RouterLink to="/">
      <div class="flex justify-between items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div class="">
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </RouterLink>
    <nav>
      <ul class="flex items-center gap-10">
        <li
          @click="() => emit('cartController')"
          class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        >
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }}&nbsp;руб.</b>
        </li>
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <RouterLink to="/favorites">Закладки</RouterLink>
        </li>
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/profile.svg" alt="Cart" />
          <RouterLink to="/orders">Профиль</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
