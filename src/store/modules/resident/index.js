import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      flats: null,
      rates: null,
      users: null,
      usersDetails: [],
      userDetails: null,
      contract: null,
    };
  },
  mutations,
  actions,
  getters,
};
