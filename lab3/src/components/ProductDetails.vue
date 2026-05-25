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

const discountedPrice = computed(() => {
  if (props.product.discount > 0) {
    const final = props.product.price - (props.product.price * props.product.discount) / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(final);
  }
  return null;
});

const stockLabel = computed(() =>
  props.product.stock > 0 ? `${props.product.stock} in stock` : "Out of Stock",
);

const stockClass = computed(() =>
  props.product.stock > 0 ? "badge-success" : "badge-error",
);

const handleBuy = () => {
  cartStore.addToCart(props.product);
};
</script>

<template>
  <div class="card lg:card-side bg-base-100 shadow-lg">
    <figure class="lg:w-1/2">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-80 object-cover"
      />
    </figure>

    <div class="card-body lg:w-1/2 space-y-4">
      <div class="flex items-center gap-2">
        <h1 class="card-title text-2xl">{{ product.name }}</h1>
        <span
          v-if="product.badge"
          class="badge badge-secondary"
        >
          {{ product.badge }}
        </span>
      </div>

      <p class="text-base-content/70">{{ product.description }}</p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="badge badge-outline"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <span v-if="discountedPrice" class="text-2xl font-bold text-primary">
          {{ discountedPrice }}
        </span>
        <span
          :class="discountedPrice ? 'text-lg line-through text-base-content/40' : 'text-2xl font-bold text-primary'"
        >
          {{ formattedPrice }}
        </span>
        <span
          v-if="product.discount > 0"
          class="badge badge-accent badge-sm"
        >
          -{{ product.discount }}%
        </span>
      </div>

      <div class="flex items-center gap-3">
        <span class="badge" :class="stockClass">{{ stockLabel }}</span>
      </div>

      <div class="card-actions">
        <button
          class="btn btn-primary"
          :disabled="product.stock === 0"
          @click="handleBuy"
        >
          {{ product.stock > 0 ? "Buy Now" : "Out of Stock" }}
        </button>
      </div>
    </div>
  </div>
</template>
