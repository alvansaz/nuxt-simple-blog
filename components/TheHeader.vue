<template>
  <header
    class="flex items-center p-5 shadow-header lg:px-20 lg:py-6 2xl:px-48 2xl:py-9"
  >
    <div class="ml-16 2xl:ml-40">
      <img class="w-12" src="/logo.png" alt="" />
    </div>
    <ul class="hidden md:flex gap-16 xl:gap-24 xl:text-xl">
      <li><NuxtLink to="/">خانه</NuxtLink></li>
      <li><NuxtLink to="/products">محصولات</NuxtLink></li>
      <li><NuxtLink to="/services">خدمات</NuxtLink></li>
      <li><NuxtLink to="/blog">وبلاگ</NuxtLink></li>
    </ul>

    <AppBtn
      color="white"
      class="hidden md:block mr-auto py-1 px-8 xl:py-4 xl:px-16"
      :class="`${loginBtnText === 'ورود' ? '' : '!text-red !border-red' }`"
      @click="openLogin"
      >{{loginBtnText}}</AppBtn
    >

    <button class="md:hidden mr-auto">
      <img
        @click="showDrawer = true"
        class="w-6"
        src="/icons/hamburger-icon.svg"
      />
    </button>
  </header>
  <div
    class="h-screen bg-gray z-10 fixed w-full left-0 top-0 invisible opacity-0 transition-all"
    :class="{ '!visible !opacity-100': showDrawer }"
    @click.self="showDrawer = false"
  >
    <div
      class="absolute left-0 top-0 h-screen w-48 bg-white flex flex-col py-12 items-center"
    >
      <AppBtn
        color="white"
        class="hidden md:block mr-auto py-1 px-8 xl:py-4 xl:px-16"
        @click="openLogin"
        >{{loginBtnText}}</AppBtn
      >
      <ul class="flex flex-col gap-5 items-center">
        <li @click="showDrawer = false"><NuxtLink to="/">خانه</NuxtLink></li>
        <li @click="showDrawer = false">
          <NuxtLink to="/products">محصولات</NuxtLink>
        </li>
        <li @click="showDrawer = false">
          <NuxtLink to="/services">خدمات</NuxtLink>
        </li>
        <li @click="showDrawer = false">
          <NuxtLink to="/blog">وبلاگ</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <ClientOnly>
    <Teleport to="body">
      <LoginModal v-if="showLogin" @click-outside="closeLogin" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import AppBtn from '@/components/AppBtn.vue'
import LoginModal from '@/components/LoginModal.vue'

const { getToken } = useApollo()

const showDrawer = ref(false)
const showLogin = ref(false)
const loginBtnText = ref('ورود')

const openLogin = () => {
  showLogin.value = true
}

const closeLogin = () => {
  showLogin.value = false
}


onMounted(async () => {
  const token = await getToken()
  loginBtnText.value = token ? 'خروج' : 'ورود'

})
</script>

<style scoped>
header .router-link-active {
  position: relative;
}

header .router-link-active::before {
  content: '';
  position: absolute;
  background-color: #00c853;
  left: 0;
  bottom: -30px;
  height: 5px;
  width: 100%;
}

@media (min-width: 1024px) {
  header .router-link-active::before {
    bottom: -45px;
  }
}

@media (min-width: 1536px) {
  header .router-link-active::before {
    bottom: -55px;
  }
}
</style>
