import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      nodes_2: [
        {
          id: "c1",
          name: "Budynek_1",
          town: "Warszawa",
          street: "Złota-47",
          number: "13",
          zipCode: "00-006",
          yearConstruction: "2015",
          areaM2: 1823,
          numberStoreys: "12",
          flats: [
            {
              id: "b1",
              storey: 1,
              number: 123,
              type: "Mieszkalny",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "b4",
              storey: 1,
              number: 100,
              type: "Usługowy21",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "b5",
              storey: 1,
              number: 144,
              type: "Usługowy15",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "b6",
              storey: 10,
              number: 1021,
              type: "Usługowy123",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "b2",
              storey: 3,
              number: 323,
              type: "Usługowy10000",
              areaM2: 77,
              typeUse: "Wynajem",
              building: "iieiieiq",
            },
          ],
        },
        {
          id: "c2",
          name: "Budynek_10",
          town: "Warszawa",
          street: "Złota-47",
          number: "13",
          zipCode: "00-006",
          yearConstruction: "2015",
          areaM2: 1823,
          numberStoreys: "12",
          flats: [
            {
              id: "d1",
              storey: 1,
              number: 123,
              type: "Usługowy",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "d4",
              storey: 1,
              number: 100,
              type: "Usługowy",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "d5",
              storey: 1,
              number: 144,
              type: "Usługowy",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "d6",
              storey: 10,
              number: 1021,
              type: "Usługowy",
              areaM2: 31,
              typeUse: "Wynajem",
              building: "kffkdsfklsjfs",
            },
            {
              id: "d2",
              storey: 3,
              number: 323,
              type: "Usługowy",
              areaM2: 77,
              typeUse: "Wynajem",
              building: "iieiieiq",
            },
          ],
        },
        {
          id: "c3",
          name: "Budynek_2",
          town: "Kraków",
          street: "Złota-47",
          number: "13",
          zipCode: "00-006",
          yearConstruction: "2001",
          areaM2: 4000,
          numberStoreys: "12",
          flats: [
            {
              id: "g3",
              storey: 7,
              number: 741,
              type: "Usługowy",
              areaM2: 51,
              typeUse: "Wynajem",
              building: "dakjdhakd",
            },
            {
              id: "g5",
              storey: 7,
              number: 741,
              type: "Usługowy",
              areaM2: 51,
              typeUse: "Wynajem",
              building: "dakjdhakd",
            },
            {
              id: "g6",
              storey: 7,
              number: 741,
              type: "Usługowy",
              areaM2: 51,
              typeUse: "Wynajem",
              building: "dakjdhakd",
            },
            {
              id: "g7",
              storey: 7,
              number: 741,
              type: "Usługowy",
              areaM2: 51,
              typeUse: "Wynajem",
              building: "dakjdhakd",
            },
          ],
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
