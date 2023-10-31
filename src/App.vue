<template>
  <main-page></main-page>
</template>

<script>
import {defineComponent} from "vue";
import MainPage from "@/layouts/MainPage.vue";

export default defineComponent({
  components: {MainPage}
})

</script>

<style>
* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>
