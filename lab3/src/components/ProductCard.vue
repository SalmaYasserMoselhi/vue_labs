<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price),
);

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
};
</script>

<template>
  <article class="card bg-base-100 shadow-md h-full">
    <figure class="aspect-video overflow-hidden bg-base-200">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </figure>

    <div class="card-body gap-3">
      <div class="flex items-center justify-between">
        <h3 class="card-title text-lg">{{ product.name }}</h3>
        <span
          v-if="product.badge"
          class="badge badge-secondary badge-sm"
        >
          {{ product.badge }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <span class="text-lg font-semibold">{{ formattedPrice }}</span>
        <div class="flex gap-2">
          <RouterLink :to="{ name: 'product', params: { id: product.id } }">
            <button class="btn btn-sm btn-outline">View</button>
          </RouterLink>
          <button
            class="btn btn-sm btn-primary"
            :disabled="product.stock === 0"
            @click="handleAddToCart"
          >
            {{ product.stock > 0 ? "Add to Cart" : "Out of Stock" }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
