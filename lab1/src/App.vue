<script setup>
import { ref, computed } from "vue";

const product = ref({
  id: 1,
  name: "Cozy Sneakers",
  description: "High-quality sneakers that go with everything you wear.",
  image: "https://placehold.co/300x300/1a1a2e/e0e0e0?text=Cozy+Sneakers",
  badge: "NEW",
  price: 120,
  discount: 20,
  tags: ["Fashion", "Casual", "Sport"],
  isAvailable: true,
});

const relatedProducts = ref([
  {
    id: 2,
    name: "Running Shoes",
    price: 90,
    discount: 10,
    image: "https://placehold.co/150x150/1a1a2e/e0e0e0?text=Running+Shoes",
  },
  {
    id: 3,
    name: "Casual Boots",
    price: 150,
    discount: 0,
    image: "https://placehold.co/150x150/1a1a2e/e0e0e0?text=Casual+Boots",
  },
  {
    id: 4,
    name: "Flip Flops",
    price: 30,
    discount: 50,
    image: "https://placehold.co/150x150/1a1a2e/e0e0e0?text=Flip+Flops",
  },
]);

const discountedPrice = computed(() => {
  return product.value.price - (product.value.price * product.value.discount) / 100;
});

const getDiscountedPrice = (item) => {
  return item.price - (item.price * item.discount) / 100;
};

const cartCount = ref(0);

const addToCart = () => {
  cartCount.value++;
};
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl">ShoeStore</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-outline btn-sm">Cart ({{ cartCount }})</button>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="card lg:card-side bg-base-100 shadow-lg">
        <figure class="lg:w-1/2">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-80 object-cover"
          />
        </figure>

        <div class="card-body lg:w-1/2">
          <div v-if="product.badge" class="mb-2">
            <span
              class="badge badge-secondary"
              :class="{ 'badge-warning': product.badge === 'NEW' }"
            >
              {{ product.badge }}
            </span>
          </div>

          <div v-if="!product.isAvailable" class="mb-2">
            <span class="badge badge-error">Out of Stock</span>
          </div>

          <h1 class="card-title text-2xl">{{ product.name }}</h1>
          <p class="text-base-content/70">{{ product.description }}</p>

          <div class="flex items-center gap-3 mt-4">
            <span class="text-2xl font-bold text-primary">
              ${{ discountedPrice }}
            </span>
            <span
              v-if="product.discount > 0"
              class="text-lg line-through text-base-content/40"
            >
              ${{ product.price }}
            </span>
            <span
              v-if="product.discount > 0"
              class="badge badge-accent badge-sm"
            >
              -{{ product.discount }}%
            </span>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="badge badge-outline"
            >
              {{ tag }}
            </span>
          </div>

          <div class="card-actions mt-6">
            <button
              class="btn btn-primary"
              :disabled="!product.isAvailable"
              @click="addToCart"
            >
              {{ product.isAvailable ? "Buy Now" : "Out of Stock" }}
            </button>
            <button class="btn btn-outline">Add to Wishlist</button>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-xl font-bold mb-6">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in relatedProducts"
            :key="item.id"
            class="card bg-base-100 shadow-md"
          >
            <figure>
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-base">{{ item.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="font-bold text-primary">
                  ${{ getDiscountedPrice(item) }}
                </span>
                <span
                  v-if="item.discount > 0"
                  class="text-sm line-through text-base-content/40"
                >
                  ${{ item.price }}
                </span>
              </div>
              <div class="card-actions justify-end mt-2">
                <button class="btn btn-primary btn-sm" @click="addToCart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
