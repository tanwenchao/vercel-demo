<script setup lang="ts">

import { useUser } from './composables/useUser'

const { isLogin, notLogin, user, logoutFn } = useUser()
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
      <RouterLink to="/login" v-if="notLogin">login</RouterLink>
      <RouterLink to="/login" v-if="isLogin" @click="logoutFn">logout ({{ user.username }})</RouterLink>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  text-align: center;
}
nav a {
  text-decoration: none;
  color: #999;
  margin-right: 24px;
}
nav a.router-link-active{
  color: #36c60b;
  font-weight: bold;
}
nav a:last-child{
  margin-right: 0;
}
</style>
