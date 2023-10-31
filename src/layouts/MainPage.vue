<template>
  <v-app>
    <header-menu></header-menu>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <sidebar-menu></sidebar-menu>
          </v-col>
          <v-col class="padding"  cols="10">
            <main-table></main-table>
            <search-form v-if="this.$store.state.isSearchFormOpen"></search-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {defineComponent} from "vue";
import HeaderMenu from "@/components/HeaderMenu.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import MainTable from "@/components/MainTable.vue";
import SearchForm from "@/components/SearchForm.vue";
import store from "@/store";

export default defineComponent({
  computed: {
    store() {
      return store
    }
  },
  components: {MainTable, SidebarMenu, HeaderMenu, SearchForm}
})

</script>

<style>

.container {
  padding: 0;
  min-height: 100%;
  align-items: normal;
  height: calc(100vh - 60px);
}

.row {
  margin: 0;
}

.col {
  padding: 0;
}

.padding {
  display: flex;
  padding: 12px 40px 21px 10px;
}
</style>