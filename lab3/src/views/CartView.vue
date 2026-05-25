<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const customerName = ref("");
const customerAddress = ref("");

const isFormValid = computed(() => {
  return customerName.value.trim() !== "" && customerAddress.value.trim() !== "";
});

const handleCheckout = () => {
  cartStore.clearCart();
  customerName.value = "";
  customerAddress.value = "";
};
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <h1 class="text-2xl font-bold">Your Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <h2 class="text-xl text-base-content/60 mb-4">Your cart is empty</h2>
      <RouterLink :to="{ name: 'home' }" class="btn btn-primary">
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else class="space-y-6">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-12 h-12 rounded">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                  </div>
                  <span class="font-medium">{{ item.name }}</span>
                </div>
              </td>
              <td>${{ item.price.toFixed(2) }}</td>
              <td>{{ item.qty }}</td>
              <td class="font-semibold">${{ (item.price * item.qty).toFixed(2) }}</td>
              <td>
                <button
                  class="btn btn-sm btn-error btn-outline"
                  @click="cartStore.removeFromCart(item.id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end">
        <div class="text-xl font-bold">
          Total: ${{ cartStore.totalPrice.toFixed(2) }}
        </div>
      </div>

      <div class="divider">Checkout</div>

      <fieldset class="fieldset bg-base-100 rounded-lg p-6 space-y-4">
        <legend class="fieldset-legend text-lg">Shipping Details</legend>

        <label class="label" for="customerName">Name</label>
        <input
          id="customerName"
          v-model="customerName"
          type="text"
          placeholder="Your full name"
          class="input input-bordered w-full"
        />

        <label class="label" for="customerAddress">Address</label>
        <input
          id="customerAddress"
          v-model="customerAddress"
          type="text"
          placeholder="Your shipping address"
          class="input input-bordered w-full"
        />

        <button
          class="btn btn-primary w-full mt-2"
          :disabled="!isFormValid"
          @click="handleCheckout"
        >
          Place Order
        </button>
      </fieldset>
    </div>
  </div>
</template>
