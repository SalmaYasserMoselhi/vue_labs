<script setup>
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
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
          <RouterLink :to="{ name: 'cart' }">Cart</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <RouterLink :to="{ name: 'cart' }" class="btn btn-outline btn-sm">
        Cart ({{ cartStore.totalItems }})
      </RouterLink>
    </div>
  </div>
</template>
