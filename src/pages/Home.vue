<script setup>
import CardList from '../components/CardList.vue';
import { inject } from 'vue';
import { store } from '@/store';

const addToFavorite = inject('addToFavorite');

const filter = inject('filter');
const onClickAddCard = inject('onClickAddCard')

const onChangeSelect = (e) => {
  filter.sortBy = e.target.value;
};
const onChangeSearchInput = (e) => {
  filter.searchByQuery = e.target.value;
};
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-center">Все кроссовки</h2>
    <div class="flex gap-3">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <label class="relative" for="">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Поиск" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md p-2 pl-11 outline-none focus:border-gray-400"
          type="text"
          placeholder="Найти..."
        />
      </label>
    </div>
  </div>
  <CardList
    class="mt-5"
    :items="store.items"
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAddCard"
  />
</template>
