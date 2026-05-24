<script setup>
import { onMounted, onUnmounted } from "vue";

defineProps({
  totalStock: {
    type: Number,
    default: 0,
  },
});

onMounted(() => {
  console.log("NavBar mounted");
});

onUnmounted(() => {
  console.log("NavBar unmounted");
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">
        ShoeStore
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'product', params: { id: 1 } }">
            Products
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <span class="badge badge-primary badge-lg">
        Stock: {{ totalStock }}
      </span>
    </div>
  </div>
</template>
