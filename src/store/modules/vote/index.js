import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      votes: null,
      voteDetails: null,
      votePdf: null,
      error: null,
    };
  },
  mutations,
  actions,
  getters,
};
