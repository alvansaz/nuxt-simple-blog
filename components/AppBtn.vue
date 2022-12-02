<template>
  <button
    :type="btnType"
    class="xl:text-lg hover:shadow-button border-1 border-solid rounded-md xl:rounded-2xl active:shadow-button-pressed disabled:shadow-none"
    :class="`${
      color === 'white'
        ? 'white border-green text-green  disabled:text-[#817F7F] disabled:border-[#817F7F]'
        : 'green border-none bg-green text-white disabled:bg-[#817F7F]'
    }`"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
  btnType: {
    type: String,
    default: 'button',
  },
})
</script>

<style scoped>
.green:active {
  background-color: rgba(0, 200, 83, 0.5);
}
.white:active {
  background-color: rgba(242, 242, 242, 0.5);
}
</style>
