export default {
  addBuilding(state, payload) {
    state.nodes_2.push(payload);
  },
  setBuildings(state, payload) {
    state.nodes_2 = payload;
  },
};