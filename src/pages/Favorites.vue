<script setup>
import { inject } from 'vue';
import CardList from '../components/CardList.vue';
import InfoBlock from '../components/InfoBlock.vue';
import { store } from '@/store';

const addToFavorite = inject('addToFavorite');
const onClickAddCard = inject('onClickAddCard');
</script>

<template>
  <div
    v-if="store.items.filter((item) => item.isFavorite === true).length"
    class="flex gap-5 items-center"
  >
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
    <h2 class="text-3xl font-bold">Мои закладки</h2>
  </div>

  <CardList
    v-if="store.items.filter((item) => item.isFavorite === true).length"
    :items="store.items.filter((item) => item.isFavorite === true)"
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAddCard"
  />
  <InfoBlock
    v-if="!store.items.filter((item) => item.isFavorite === true).length"
    title="Закладок нет :("
    description="Вы ничего не добавляли в закладки"
    imageUrl="/emoji-1.png"
    :size="70"
  />
</template>
