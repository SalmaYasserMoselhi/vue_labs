<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("AboutView mounted");
});

onUnmounted(() => {
  console.log("AboutView unmounted");
});
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">About ShoeStore</h1>

    <div class="card bg-base-100 shadow-md">
      <div class="card-body space-y-4">
        <p>
          ShoeStore is a demo online shoe store built as part of the
          VueJS course at ITI (Information Technology Institute).
        </p>
        <p>
          This project demonstrates Vue Router, component composition,
          props and emits communication, and lifecycle hooks in a
          multi-page single page application.
        </p>

      </div>
    </div>
  </div>
</template>
