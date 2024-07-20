<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
});

const emit = defineEmits(['onClickRemove']);
</script>

<template>
  <li class="flex items-center gap-5 border border-slate-100 p-4 rounded-xl justify-between">
    <img class="w-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col">
      <h3>{{ title }}</h3>
      <p class="font-bold">{{ price }}&nbsp;₽</p>
    </div>
    <img
      @click="emit('onClickRemove')"
      class="flex self-end cursor-pointer opacity-40 hover:opacity-100 transition"
      src="/close.svg"
      alt=""
    />
  </li>
</template>
