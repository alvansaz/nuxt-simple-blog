<template>
  <div
    class="bg-gray flex justify-center items-center fixed top-0 left-0 w-full h-full"
    @click.self="$emit('click-outside')"
  >
    <div
      class="bg-white py-12 xl:py-56 w-4/5 flex flex-col justify-center items-center"
    >
      <h2 class="font-medium text-2xl lg:text-3xl 2xl:text-5xl pb-10 xl:pb-12">
        ورود به حساب کاربری
      </h2>
      <form class="xl:w-3/12" @submit.prevent="login">
        <label class="lg:text-lg block mb-2">نام کاربری</label>
        <div
          class="mx-auto rounded-2xl p-4 border-solid border-gray border-1 flex items-center gap-3 mb-6"
          :class="{ 'shadow-search-avtive': activeUsernameInput }"
        >
          <span><PersonIcon class="text-xl text-[#7B7B7B]" /></span>
          <input
            type="text"
            name="search"
            @focus="activeUsernameInput = true"
            @blur="activeUsernameInput = false"
            v-model="userName"
            placeholder="نام کاربری خود را وارد کنید"
            class="caret-green flex-grow border-none outline-none"
          />
        </div>

        <label class="lg:text-lg block mb-2">رمز عبور</label>
        <div
          class="mx-auto rounded-2xl p-4 border-solid border-gray border-1 flex items-center gap-3 mb-6"
          :class="{ 'shadow-search-avtive': activePasswordInput }"
        >
          <span><LockIcon class="text-xl text-[#7B7B7B]" /></span>
          <input
            type="text"
            name="search"
            @focus="activePasswordInput = true"
            @blur="activePasswordInput = false"
            v-model="password"
            placeholder="رمز عبور خود را وارد کنید"
            class="caret-green flex-grow border-none outline-none"
          />
        </div>

        <p class="text-red">{{ loginError }}</p>

        <AppBtn color="green" btn-type="submit" class="w-full py-4 mt-4 xl:mt-7"
          >ورود</AppBtn
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import PersonIcon from '~icons/mdi/person'
import LockIcon from '~icons/mdi/lock'
import AppBtn from '@/components/AppBtn.vue'

const { onLogin } = useApollo()

const activeUsernameInput = ref(false)
const activePasswordInput = ref(false)
const userName = ref('')
const password = ref('')
const loginError = ref('')

const userLoginMutation = gql`
  mutation userLogin($inputs: UserLoginInput) {
    userLogin(inputs: $inputs) {
      token {
        accessToken
      }
    }
  }
`

const login = async () => {
  const variables = {
    inputs: {
      userName: userName.value,
      password: password.value,
    },
  }

  try {
    const { mutate, error } = useMutation(userLoginMutation, variables)
    const data = await mutate(variables)
    onLogin(data.data.userLogin.token.accessToken)
    location.reload()
  } catch (error) {
    loginError.value = error
    console.error(error)
  }
}
</script>
