<script setup>
import { store } from '@/store';
import CardList from '../components/CardList.vue';
import InfoBlock from '../components/InfoBlock.vue';
import axios from 'axios';
import { API_URL } from '@/const';
import { onMounted } from 'vue';

const fetchOrders = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/orders?user_id=${store.auth}`);
    store.orders.value = data.map((order) => order.items).flat();
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchOrders();
});
</script>

<template>
  <div v-if="store.orders.value?.length" class="flex gap-5 items-center">
    <RouterLink to="/" class="border rounded-md px-4 py-3">
      <svg
        class="rotate-180"
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.999999L6 6L1 11"
          stroke="#C8C8C8"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </RouterLink>
    <h2 class="text-3xl font-bold">Мои покупки</h2>
  </div>
  <CardList v-if="store.orders.value?.length" :items="store.orders.value" :isOrder="true" />
  <InfoBlock
    v-if="!store.orders.value?.length"
    title="У вас нет заказов"
    description="Вы нищеброд? Оформите хотя бы один заказ."
    imageUrl="/emoji-2.png"
    :size="70"
  />
</template>
