<script setup lang="ts">
import { getData } from '../api'
import { ref, onMounted } from 'vue'

const text = ref('home - 小谭来测试vercel前端自动化部署-111-2222')

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <h2>{{ text }}</h2>
  </div>
</template>

<style scoped>
</style>
