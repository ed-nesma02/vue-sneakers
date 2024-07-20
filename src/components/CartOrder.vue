<script setup>
import { inject } from 'vue';

const { totalPrice, vatPrice, cart } = inject('cart');
const { createOrder } = inject('order');
</script>

<template>
  <div class="mt-5">
    <ul class="flex flex-col gap-2">
      <li class="flex justify-between">
        <p>Итого:</p>
        <span class="font-bold">{{ totalPrice }}&nbsp;₽</span>
      </li>
      <li class="flex justify-between">
        <p>Налог 5%:</p>
        <span class="font-bold">{{ vatPrice }}&nbsp;₽</span>
      </li>
    </ul>
    <button
      :disabled="cart.length ? false : true"
      @click="createOrder"
      class="mt-6 w-full text-white bg-lime-400 border rounded-2xl py-3 hover:bg-lime-500 transition active:bg-lime-600 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Оформить заказ
    </button>
  </div>
</template>
