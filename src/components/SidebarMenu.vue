<template>
  <v-container class="color">
    <v-row>
      <v-col>
        <v-list class="pa-0">
          <v-list-group
              :value="true"
          >
            <template v-slot:activator>
              <v-list-item-title>Профили</v-list-item-title>
            </template>

            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
              <v-list-item
                  class="list-item"
                  v-for="(item, i) in items"
                  :key="i"
                  color="primary"
              >
                <router-link :to="item.route" style="width: 100%; display: flex">
                <v-list-item-icon class="mr-5">
                  <v-icon class="primary--text" v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="list-item-text" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </router-link>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: 'все',
      selectedItem: 1,
      items: [
        { text: 'Все', icon: 'mdi-check-circle', route: '/all' },
        { text: 'Обработанные', icon: 'mdi-check-circle',  route: '/processed' },
        { text: 'Не обработанные', icon: 'mdi-alert-circle',  route: '/not-processed' },
      ],
    };
  }
};
</script>

<style>
.color {
  background: #FFFFFF;
  height: 100%;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
}

.list-item {
  padding-left: 31px;
}

.list-item-text {
  font-family: Roboto,serif;
  font-size: 15px;
  font-weight: 300;
  color: #000000;
}
</style>

