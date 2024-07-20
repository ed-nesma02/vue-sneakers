<script setup>
import Card from './Card.vue';
defineProps({
  items: Array,
  isOrder: Boolean
});

const emit = defineEmits(['addToFavorite', 'addToCart']);

</script>

<template>
  <ul v-auto-animate class="grid grid-cols-4 gap-5 mt-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :item="item"
      :onClickAdd="!isOrder ? () => emit('addToCart', item) : null"
      :onClickFavorite="!isOrder ? () => emit('addToFavorite', item) : null"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </ul>
</template>
