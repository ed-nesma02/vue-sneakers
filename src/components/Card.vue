<script setup>
defineProps({
  item: Object,
  id: Number,
  onClickAdd: Function,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function
});
</script>
<template>
  <li>
    <article
      class="relative flex flex-col justify-between h-full border bg-white border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
    >
      <div class="absolute top-8 left-8">
        <img
          v-if="onClickFavorite"
          @click="onClickFavorite"
          :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
          alt="Favorite"
        />
      </div>
      <img :src="item.imageUrl" class="w-full" :alt="item.title" />
      <h3>{{ item.title }}</h3>
      <div class="flex justify-between items- mt-5">
        <div class="flex flex-col gap-2">
          <span class="text-zinc-400">Цена:</span>
          <span class="font-bold">{{ item.price }}&nbsp;₽</span>
        </div>
        <img
          v-if="onClickAdd"
          @click="onClickAdd"
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          alt="Plus"
        />
      </div>
    </article>
  </li>
</template>
