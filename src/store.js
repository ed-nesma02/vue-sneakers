import { reactive, ref } from 'vue';

export const store = reactive({
  items: ref([]),
  favorites: ref([]),
  cart: ref([]),
  orders: ref([]),
  order: ref([]),
  orderSent: ref(false),
  auth: ref('')
});
