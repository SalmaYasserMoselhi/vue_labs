<script setup>
</script>

<template>
  <div class="carousel w-full rounded-lg overflow-hidden">
    <div id="slide1" class="carousel-item relative w-full">
      <div class="w-full h-64 bg-base-300 flex items-center justify-center">
        <div class="text-center px-8">
          <h2 class="text-3xl font-bold mb-2">Summer Collection</h2>
          <p class="text-base-content/70">Up to 50% off on selected items</p>
        </div>
      </div>
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" class="btn btn-circle">&#10094;</a>
        <a href="#slide2" class="btn btn-circle">&#10095;</a>
      </div>
    </div>

    <div id="slide2" class="carousel-item relative w-full">
      <div class="w-full h-64 bg-base-300 flex items-center justify-center">
        <div class="text-center px-8">
          <h2 class="text-3xl font-bold mb-2">New Arrivals</h2>
          <p class="text-base-content/70">Check out the latest sneakers</p>
        </div>
      </div>
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" class="btn btn-circle">&#10094;</a>
        <a href="#slide3" class="btn btn-circle">&#10095;</a>
      </div>
    </div>

    <div id="slide3" class="carousel-item relative w-full">
      <div class="w-full h-64 bg-base-300 flex items-center justify-center">
        <div class="text-center px-8">
          <h2 class="text-3xl font-bold mb-2">Free Shipping</h2>
          <p class="text-base-content/70">On orders above $100</p>
        </div>
      </div>
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" class="btn btn-circle">&#10094;</a>
        <a href="#slide1" class="btn btn-circle">&#10095;</a>
      </div>
    </div>
  </div>
</template>
