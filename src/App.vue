<script setup>
import Header from './components/Header.vue';

import { computed, onMounted, provide, reactive, watch } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from './const';
import Cart from './components/Cart.vue';
import { RouterView } from 'vue-router';
import { store } from './store';

const cart = ref([]);

const filter = reactive({
  sortBy: 'name',
  searchByQuery: ''
});

provide('filter', filter);

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
        user_id: store.auth
      };
      item.isFavorite = true;
      const { data } = await axios.post(`${API_URL}/favorites`, obj);
      await fetchFavorites();
      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(`${API_URL}/favorites/${item.favoriteId}`);
      await fetchFavorites();
      delete item.favoriteId;
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

provide('addToFavorite', addToFavorite);

const cartOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const onClickAddCard = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

provide('onClickAddCard', onClickAddCard);

const createOrder = async () => {
  try {
    const { data } = await axios.post(`${API_URL}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
      user_id: store.auth
    });
    cart.value = [];
    store.orderSent = true;
    store.order = data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cartController = () => {
  cartOpen.value = !cartOpen.value;
  store.orderSent = false;
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filter.sortBy
    };

    if (filter.searchByQuery) {
      params.title = `*${filter.searchByQuery}*`;
    }
    const { data } = await axios.get(`https://6e221bb06553f42e.mokky.dev/items`, {
      params
    });
    store.items = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }));
    updateCart();
    updateFavorites();
  } catch (error) {
    console.error(error);
  }
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${API_URL}/favorites?_relations=items&user_id=${store.auth}`);
    store.favorites = favorites;
  } catch (error) {
    console.error(error);
  }
};

const updateCart = () => {
  store.items = store.items.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
};

const updateFavorites = () => {
  store.items.value = store.items.map((item) => {
    store.favorites.map((favorite) => {
      if (favorite.item.id === item.id) {
        item.isFavorite = true;
        item.favoriteId = favorite.id;
      }
    });
  });
};

const auth = async () => {
  store.auth = JSON.parse(localStorage.getItem('auth') || "0");
  if (!store.auth) {
    const { data } = await axios.post(`${API_URL}/users`);
    store.auth = data.id;
    localStorage.setItem('auth', data.id);
  }
};

onMounted(async () => {
  await auth();
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]');
  await fetchFavorites();
  await fetchItems();
});

watch(filter, fetchItems);

watch(cart, () => {
  if (!cart.value.length) {
    store.items = store.items.map((item) => ({ ...item, isAdded: false }));
  }
});

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  {
    deep: true
  }
);

provide('cart', { cart, cartController, removeFromCart, totalPrice, vatPrice, addToCart });
provide('order', { createOrder });
</script>

<template>
  <Cart v-if="cartOpen" />
  <div class="bg-white m-auto w-4/5 rounded-xl shadow-xl my-14 min-h-screen">
    <Header :total-price="totalPrice" @cart-controller="cartController" />
    <div class="px-10 py-8">
      <RouterView />
    </div>
  </div>
</template>
