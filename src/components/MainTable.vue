<template>
  <v-card
      class="table-box d-flex"
      elevation="3"
      shaped
      tile
  >
    <module-form v-if="isDialogFormOpen.isOpen"></module-form>
      <v-data-table
          :headers="headers"
          :items="getFormData"
          :value="selectUserData"
          single-select
          item-key="id"
          @click:row="chooseItem"
          class="table"
          hide-default-header
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-icon color="#0F4C82" v-if="item.status">mdi-cloud-check-variant</v-icon>
          <v-icon color="#DF2B2B" v-else>mdi-cloud-alert</v-icon>
        </template>
        <template v-slot:top>
        <v-toolbar  flat>
          <div class="table-headings-group">
            <v-toolbar-title>{{currentTitle}}</v-toolbar-title>
            <v-btn @click="fetchData" icon>
              <v-icon >mdi-restore</v-icon>
            </v-btn>
          </div>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                Действия
              </v-btn>
            </template>

            <v-list class="list">
                  <v-list class="list">
                    <v-list-item @click="setDialogOpen('add')">
                      <v-list-item-title>Добавить</v-list-item-title>
                    </v-list-item>
                        <v-list-item  @click="setDialogOpen('change')">
                          <v-list-item-title>Изменить</v-list-item-title>
                        </v-list-item>
                    <v-list-item @click="deleteSelectedElements()">
                      <v-list-item-title>Удалить</v-list-item-title>
                    </v-list-item>
                  </v-list>
            </v-list>
          </v-menu>
        </v-toolbar>
        </template>
      <template v-slot:header="{ props: { headers } }">
        <thead>
        <tr>
          <th v-for="h in headers" :key="h.value" :class="h.class">
            <span>{{ h.text }}</span>
          </th>
        </tr>
        </thead>
      </template>
      </v-data-table>
  </v-card>
</template>

<script>
import ModuleForm from "@/components/ModuleForm.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      currentTitle: 'Обработаные',
      headers: [
        { text: 'Имя', value: 'firstName', class: 'my-header-style black--text' },
        { text: 'Фамилия', value: 'lastName', class: 'my-header-style black--text' },
        { text: 'Компания', value: 'company', class: 'my-header-style black--text' },
        { text: 'Специальность', value: 'jobTitle', class: 'my-header-style black--text' },
        { text: 'Телефон', value: 'phone', class: 'my-header-style black--text' },
        { text: 'Е-mail', value: 'email', class: 'my-header-style black--text' },
        { text: 'Интересы', value: 'interests', class: 'my-header-style black--text' },
      ],
      buttonItems: ['Добавить', 'Изменить', 'Удалить']
    };
  },
  methods: {
    ...mapActions(['fetchData', 'getStatusData','deleteSelectedElements']),
    ...mapMutations(['removeData', 'changeData', 'selectDataDelete', 'selectDataPush', 'setDialogOpen']),

    chooseItem(item, row) {
      if (row.isSelected) {
        const index = this.selectUserData.findIndex(selected => selected.id === item.id);
        if (index !== -1) {
          this.selectDataDelete(index);
        }
        row.select(false);
      } else {
        this.selectDataPush(item);
        row.select(true);
      }
    },

    updateHeader(title, value = null, className = null) {
      this.currentTitle = title;
      if (this.headers.length === 8) {
        this.headers.shift();
      }
      if (value && className) {
        this.headers.unshift({ text: 'Статус', value, class: className });
      }
    }
  },

  computed: {
    ...mapGetters(['getFormData','selectUserData', 'isDialogFormOpen']),
  },

  components: {ModuleForm},

  watch: {
    $route(to) {
      switch (to.name) {
        case 'AllProfiles':
          this.updateHeader('Все', 'status', 'my-header-style');
          this.fetchData();
          break;
        case 'ProcessedProfiles':
          this.updateHeader('Обработанные');
          this.getStatusData(true);
          break;
        case 'NotProcessedProfiles':
          this.updateHeader('Не обработанные');
          this.getStatusData(false);
          break;
        default:
          this.updateHeader('Заголовок по умолчанию');
          this.fetchData();
      }
    }
  }

};
</script>

<style>
.table-box {
  padding: 30px 20px 0 20px;
  flex-grow: 1;
}

.table-headings {
  display: flex;
  justify-content: space-between;
}

.v-data-table__wrapper {
  height: 100%;
}

.table-headings-group {
  display: flex;
  align-items: center;
  min-width: 180px;
  justify-content: space-between;
}

.list {
  padding: 17px 10px 17px 11px;
}

.table {
  min-width: 100%;
  display: flex;
  flex-direction: column;
}

.v-toolbar__content {
  justify-content: space-between;
}


.v-btn:not(.v-btn--round).v-size--default {
  padding: 11px 60px;
}

.v-list-item {
  font-family: Roboto,serif;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}

.table-text {
  font-family: Roboto,serif;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

.table-title {
  font-family: Roboto,serif;
  font-size: 16px;
  font-weight: 400;
}

.my-header-style {
  font-size: 16px !important;
  font-family: Roboto,serif;
  font-weight: 600;
}
</style>
