<script setup lang="ts">
import Content from "./Content.vue"
</script>

<template>
  <div>
    <n-grid :cols="12">
      <n-gi :offset="2" :span="8">
        <Content />
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
</style>