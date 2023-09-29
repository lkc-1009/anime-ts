<script setup lang="ts">
import Waterfall from "../components/stream/Waterfall.vue"
</script>

<template>
  <div class="content-container">
    <Waterfall :boxWidth="894" :colInterval="15" />
  </div>
</template>

<style scoped>
.content-container {
  margin-top: 10px;
}
</style>