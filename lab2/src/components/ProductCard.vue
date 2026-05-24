<script setup>
import { computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formattedPrice = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.product.price),
);

onMounted(() => {
  console.log("ProductCard mounted - " + props.product.name);
});

onUnmounted(() => {
  console.log("ProductCard unmounted - " + props.product.name);
});
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
        <RouterLink :to="{ name: 'product', params: { id: product.id } }">
          <button class="btn btn-sm btn-primary">View Product</button>
        </RouterLink>
      </div>
    </div>
  </article>
</template>
