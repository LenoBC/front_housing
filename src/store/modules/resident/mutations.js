export default {
  setFlats(state, payload) {
    state.flats = payload;
  },
  setRates(state, payload) {
    state.rates = payload;
  },
  setUsers(state, payload) {
    state.users = payload;
  },
  setUsersDetails(state, payload) {
    state.usersDetails.push(payload);
  },
  setContract(state, payload) {
    state.contract = payload;
  }
};
