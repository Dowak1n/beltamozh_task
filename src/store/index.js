import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    state: {
        userData: [],
        selectUserData: [],
        queryParams: '',
        isSearchFormOpen: false,
        isDialogFormOpen: {
            isOpen: false,
            dialogFormType: '',
        },
    },
    getters: {
        getFormData: (state) => state.userData,
        isDialogFormOpen: (state) => state.isDialogFormOpen,
        selectUserData: (state) => state.selectUserData,
    },
    mutations: {
        setSearchOpen(state) {
            state.isSearchFormOpen = !state.isSearchFormOpen;
        },
        setDialogOpen(state, text) {
            state.isDialogFormOpen.dialogFormType = text;
            if (text === 'add') {
                state.isDialogFormOpen.isOpen = !state.isDialogFormOpen.isOpen;
            }
            if (text === 'change') {
                if (state.selectUserData.length > 0) {
                    state.isDialogFormOpen.isOpen = !state.isDialogFormOpen.isOpen;
                }
            }
            if (text === '') {
                state.isDialogFormOpen.isOpen = !state.isDialogFormOpen.isOpen;
            }
        },
        selectDataDelete(state, index) {
           state.selectUserData.splice(index, 1)
        },
        selectDataPush(state, newData) {
            state.selectUserData.push(newData)
        },
        removeDataWithTrueStatus(state) {
            state.userData = state.userData.filter(item => item.status === false);
        },
        removeDataWithFalseStatus(state) {
            state.userData = state.userData.filter(item => item.status === true);
        },
        setData(state, newData) {
            state.userData = newData;
        },
        addData(state, newData) {
            state.userData.push(newData);
        },
        changeData(state, updatedData) {
            const index = state.userData.findIndex(item => item.id === updatedData.id);
            if (index !== -1) {
                Vue.set(state.userData, index, { ...state.userData[index], ...updatedData });
            }
        },
        setQueryParams(state, queryParams) {
            state.queryParams = queryParams;
        },
        removeData(state, id) {
            state.userData = state.userData.filter(item => item.id !== id);
        },
    },
    actions: {
        async fetchData({ commit, state }) {
            commit('setData', []);
            try {
                const response = await axios.get(`https://retoolapi.dev/D6xLg4/data${state.queryParams}`);
                commit('setData', response.data);
            } catch (error) {
                console.error('Ошибка при выполнении поиска:', error);
            }
        },

        async getStatusData({ commit }, value) {
            commit('setData', []);
            try {
                const response = await axios.get(`https://retoolapi.dev/D6xLg4/data?status=${value}`);
                commit('setData', response.data);
            } catch (error) {
                console.error('Ошибка при выполнении поиска:', error);
            }
        },

        async deleteSelectedElements({ commit, state }) {
            for (let i = 0; i < state.selectUserData.length; i++) {
                try {
                    const response = await axios.delete(`https://retoolapi.dev/D6xLg4/data/${state.selectUserData[i].id}`);
                    commit('removeData', state.selectUserData[i].id);
                    console.log('Был удален элемент:', response.data);
                } catch (error) {
                    console.error('Ошибка при удалении элемента:', error);
                }
            }
        },

        async applyChange({ commit, state }, dialogFields) {
            const dialogFieldsObject = {};
            for (const field of dialogFields) {
                dialogFieldsObject[field.field] = field.value;
            }
            for (let i = 0; i < state.selectUserData.length; i++) {
                try {
                    const response = await axios.put(`https://retoolapi.dev/D6xLg4/data/${state.selectUserData[i].id}`, dialogFieldsObject);
                    commit('changeData', response.data);
                } catch (error) {
                    console.error('Ошибка при изменении данных:', error);
                }
            }
            commit('setDialogOpen', '');
        },

        async applyAdd({ commit }, dialogFields) {
            const dialogFieldsObject = {};
            for (const field of dialogFields) {
                dialogFieldsObject[field.field] = field.value;
            }
            try {
                const response = await axios.post('https://retoolapi.dev/D6xLg4/data', dialogFieldsObject);
                console.log('Данные успешно добавлены:', response.data);
                commit('addData', response.data);
                commit('setDialogOpen', '');
            } catch (error) {
                console.error('Ошибка при добавлении данных:', error);
            }
        },


        updateQueryParams({ commit }, queryParams) {
            commit('setQueryParams', queryParams);
        },
    },

    modules: {
    },

});
