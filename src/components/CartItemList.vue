<script setup>
import CartItem from './CartItem.vue';
import { inject } from 'vue';

const { cart, removeFromCart } = inject('cart');
</script>

<template>
  <ul v-auto-animate class="list__cart flex flex-col gap-3 mt-8 overflow-y-auto grow">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </ul>
</template>
