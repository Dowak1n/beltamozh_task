<template>
    <v-app-bar
        color="primary"
        max-width="100%"
        height="60"
        dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="store.commit('setSearchOpen');">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>

import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      selectedItem: null,
      items: ['Имя', 'Фамилия', 'Компания', 'Специальность', 'Телефон', 'E-mail', 'Интересы']
    };
  },
  methods: {
  },
};
</script>

<style>
.v-toolbar {
  flex: none;
}
</style>