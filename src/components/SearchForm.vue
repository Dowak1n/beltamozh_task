<template>
  <div class="search-form">
    <div class="search-form-bottom-padding">
      <div v-for="(field, index) in formFields" :key="index" class="custom-input-box">
        <label class="custom-input-text" :for="field.label">{{ field.label }}</label>
        <input class="custom-input" type="text" :id="field.label" v-model="field.value" />
      </div>
    </div>
    <div class="button-group">
      <v-btn height="38px" class="button-margin" width="116px" outlined @click="clearForm">Очистить</v-btn>
      <v-btn height="38px" width="116px" color="primary" @click="applyForm">Применить</v-btn>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      formFields: [
        { label: 'Имя', text: 'firstName', value: '' },
        { label: 'Фамилия', text: 'lastName', value: '' },
        { label: 'Компания', text: 'company', value: '' },
        { label: 'Специальность', text: 'jobTitle', value: '' },
        { label: 'Телефон', text: 'phone', value: '' },
        { label: 'E-mail', text: 'email', value: '' },
        { label: 'Интересы', text: 'interests', value: '' },
      ],
    };
  },
  methods: {
    ...mapActions(['fetchData', 'updateQueryParams']),
    ...mapMutations(['setQueryParams']),

    clearForm() {
      this.formFields.forEach((field) => {
        field.value = '';
      });
    },
    async applyForm() {
      const queryParams = [];

      for (let i = 0; i < this.formFields.length; i++) {
        if (this.formFields[i].value) {
          queryParams.push(`?${this.formFields[i].text}=${this.formFields[i].value}`)
        }
      }

      await this.updateQueryParams(queryParams.join('&'));

      await this.fetchData();

      this.setQueryParams('')
      this.formFields.forEach((field) => {
        field.value = '';
      });
    },
  },
};
</script>

<style>
.search-form {
  display: flex;
  background: #FFFFFF;
  box-shadow: 0 4px 9px 0 #00000040;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border-radius: 6px;
  position: absolute;
  top: 0;
  right: 12px;
}

.custom-input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.custom-input-text {
  font-family: Roboto,serif;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 10px;
}

.custom-input {
  border: none;
  border-radius: 5px;
  min-width: 371px;
  min-height: 30px;
  box-shadow: 0 2px 5px 0 #CDCDCD inset;
  padding-left: 10px;
  font-family: Roboto,serif;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 10px;
;
}

:active, :hover, :focus {
  outline: 0;
  outline-offset: 0;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.button-margin {
  margin-right: 20px;
}

</style>

