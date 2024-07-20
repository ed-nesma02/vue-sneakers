<script setup>
import CartItemList from './CartItemList.vue';
import CartHead from './CartHead.vue';
import CartOrder from './CartOrder.vue';
import { inject } from 'vue';
import InfoBlock from './InfoBlock.vue';
import { store } from '@/store';

const { cartController, cart } = inject('cart');
</script>
<template>
  <div
    @click="cartController"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
  ></div>
  <div class="flex flex-col bg-white w-96 h-full z-20 fixed right-0 top-0 p-5">
    <CartHead />
    <InfoBlock
      v-if="!cart.length && !store.orderSent"
      title="Корзина пуста"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      imageUrl="/package-icon.png"
      :size="140"
      :isCart="true"
    />
    <InfoBlock
      v-if="store.orderSent"
      title="Заказ оформлен!"
      :description="'Ваш заказ №-' + store.order.id + ' скоро будет передан курьерской доставке'"
      imageUrl="/order-success-icon.png"
      :size="120"
      :isCart="true"
    />
    <CartItemList v-if="cart.length" />
    <CartOrder v-if="cart.length" />
  </div>
</template>
