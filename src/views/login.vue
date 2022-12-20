<script setup lang="ts">
import { useUser } from '../composables/useUser'

const { loginModel, user, isLogin, notLogin, loginFn, logoutFn } = useUser()

</script>

<template>
  <div>
    <h1>login</h1>
    <div v-if="isLogin">
      <div>welcome {{ user?.username }}</div>
      <div>
        <el-button type="primary" @click="logoutFn">退出登录</el-button>
      </div>
    </div>
    <el-form v-if="notLogin" ref="form" :model="loginModel" label-width="80px">
      <el-form-item label="Username">
        <el-input v-model="loginModel.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="loginModel.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>
