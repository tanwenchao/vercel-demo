import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useStorage, StorageSerializers } from '@vueuse/core'

interface ILoginModal {
  username: string
  password: string
}

/**
 * key
 * initValue
 * localstorage or sessionstorage
 * 序列化, 读和写都按照对象来操作
 */
const user = useStorage('user', null, undefined, {
  serializer: StorageSerializers.object
})

export const useUser = () => {

  const loginModel = ref<ILoginModal>({
    username: '',
    password: ''
  })

  const isLogin = computed(() => user.value?.id)

  const notLogin = computed(() => !user.value?.id)

  const loginFn = async () => {
    user.value = {
      id: 1,
      username: loginModel.value.username
    }
    ElMessage.success('login success')
  }

  const logoutFn = async () => {
    user.value = null
    ElMessage.success('logout success')
  }

  onMounted(() => {
    console.log(123)
  })

  return {
    loginModel,
    user,
    isLogin,
    notLogin,
    loginFn,
    logoutFn
  }
}