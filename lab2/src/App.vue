<script setup>
import { ref, computed } from "vue";
import NavBar from "@/components/NavBar.vue";

const products = ref([
  {
    id: 1,
    name: "Cozy Sneakers",
    description: "High-quality sneakers that go with everything you wear.",
    image: "/images/cozy_sneakers.jpeg",
    badge: "NEW",
    price: 120,
    discount: 20,
    stock: 10,
    tags: ["Fashion", "Casual", "Sport"],
  },
  {
    id: 2,
    name: "Running Shoes",
    description: "Built for speed and comfort on any terrain.",
    image: "/images/running_shoes.jpeg",
    badge: "",
    price: 90,
    discount: 10,
    stock: 5,
    tags: ["Sport", "Running"],
  },
  {
    id: 3,
    name: "Casual Boots",
    description: "Rugged boots for everyday adventures.",
    image: "/images/casual_boots.jpeg",
    badge: "SALE",
    price: 150,
    discount: 0,
    stock: 8,
    tags: ["Casual", "Winter"],
  },
  {
    id: 4,
    name: "Flip Flops",
    description: "Light and breezy for sunny days.",
    image: "/images/flip_flop.jpeg",
    badge: "",
    price: 30,
    discount: 50,
    stock: 20,
    tags: ["Summer", "Casual"],
  },
]);

const totalStock = computed(() => {
  return products.value.reduce((sum, p) => sum + p.stock, 0);
});

const handleBuy = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product && product.stock > 0) {
    product.stock--;
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <NavBar :total-stock="totalStock" />

    <main class="container mx-auto px-4 py-8">
      <RouterView
        v-slot="{ Component }"
      >
        <component
          :is="Component"
          :products="products"
          @buy="handleBuy"
        />
      </RouterView>
    </main>
  </div>
</template>
