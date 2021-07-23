import { createStore } from 'vuex'
import axios from 'axios';

const api = '/db.json';

export default createStore({
  state: {
    orders: [],
    formatTime(date) {
      const now = new Date(date);
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const dayString = day < 10 ? `0${day}` : `${day}`;
      const formatTime = `${year}/${monthString}/${dayString}`;
      return formatTime;
    },
    sortTimes(date) {
      const timestamp = new Date(date);
      return timestamp.getTime();
    },
  },
  mutations: {
    CHANGE_DATA(state, orders) {
      orders.map((item) => {
        item.sortTimestamp = state.sortTimes(item.date);
        item.date = state.formatTime(item.date);
      });
      state.orders = orders;
    },
  },
  actions: {
    getData({ commit }) {
      axios
        .get(api)
        .then((res) => {
          const setData = res.data.orders;
          commit('CHANGE_DATA', setData);
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {
  }
})
