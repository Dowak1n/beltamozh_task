<template>
  <v-dialog v-model="isDialogFormOpen.isOpen" max-width="700px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{isDialogFormOpen.dialogFormType === 'add' ? "Добавление" : "Изменение" }}</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-text-field
              v-for="(field, index) in dialogFields" :key="index"
              v-model="field.value"
              outlined
              :label="field.name"
              dense
          >
          </v-text-field>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clearForm()"> Назад </v-btn>
        <v-btn color="blue darken-1" text @click="isDialogFormOpen.dialogFormType === 'add' ? applyAdd(dialogFields) : applyChange(dialogFields)"> Сохранить изменения </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
export default {
  data() {
    return {
      dialogFields: [
        { field: 'firstName', value: '', name: 'Имя'},
        { field: 'lastName', value: '', name: 'Фамилия'},
        { field: 'company', value: '', name: 'Компания'},
        { field: 'jobTitle', value: '', name: 'Специальность'},
        { field: 'phone', value: '', name: 'Телефон'},
        { field: 'email', value: '', name: 'Е-mail'},
        { field: 'interests', value: '', name: 'Интересы'},
      ],
    }
  },
  computed: {
    ...mapGetters(['isDialogFormOpen','selectUserData']),
  },
  methods: {
    ...mapActions(['fetchData', 'applyChange', 'applyAdd']),
    ...mapMutations(['setDialogOpen', 'changeData','addData']),

    clearForm() {
      this.setDialogOpen('')
      this.dialogFields.forEach((field) => {
        field.value = '';
      });
    },

  },
  beforeMount() {
    const lastItem = this.selectUserData[this.selectUserData.length - 1];

    if (lastItem) {
      this.dialogFields.forEach((field) => {
        field.value = lastItem[field.field];
      });
    } else {
      this.dialogFields.forEach((field) => {
        field.value = '';
      });
    }
  }
}
</script>