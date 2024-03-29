<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <section>
    <half-page>
      <template #button>
        <section>
          <base-button @click="loadBuildings">Odśwież</base-button>
          <base-button link :to="immovableBuildingLink"
            >Dodaj budynek</base-button
          >
          <base-button link :to="immovableFlatLink">Dodaj lokal </base-button>
          <base-button @click="serchToggle">Wyszukaj</base-button>
          <base-button @click="deleteToggle" mode="delete"
            >Usuń budynek</base-button
          >
          <base-button @click="deleteToggle2" mode="delete"
            >Usuń lokal</base-button
          >
        </section>
      </template>

      <template #left>
        <div v-if="search">
          <input
            type="text"
            name="searchBar"
            placeholder="Szukaj..."
            v-model="searchQuery"
          />

          <div class="card ui fluid" style="margin: 0"></div>
        </div>
        <div v-if="isLoading">
          <base-spinner> </base-spinner>
        </div>

        <div v-else-if="hasNodes">
          <immovable-item
            v-for="build in filteredList"
            :key="build.id"
            :nodes="[build]"
            @onClick="findNodeData"
          >
          </immovable-item>
        </div>

        <h3 v-else>Brak Danych</h3>
      </template>

      <template #right>
        <div v-if="tableData.headers && tableData.items">
          <EasyDataTable
            :headers="tableData.headers"
            :items="tableData.items"
            hide-footer
          >
          </EasyDataTable>

          <base-button class="btn-base" @click="editToggle" mode="edit"
            >Edytuj</base-button
          >
          <immovable-popup-edit
            v-if="editMode"
            :editToggle="editToggle"
            :Building="building"
            :Flat="flat"
            @status="reloadList"
          >
          </immovable-popup-edit>

          <immovable-popup-delete
            v-if="deleteBuilding && building"
            :deleteToggle="deleteToggle"
            :building="building"
            @status="reloadList"
          >
          </immovable-popup-delete>

          <immovable-popup-delete
            v-if="deleteFlat && flat"
            :deleteToggle="deleteToggle2"
            :flat="flat"
            @status="reloadList"
          >
          </immovable-popup-delete>
        </div>
      </template>
    </half-page>
  </section>
</template>

<script>
import ImmovableItem from "./ImmovableItem.vue";
import ImmovablePopupEdit from "./ImmovablePopupEdit.vue";
import ImmovablePopupDelete from "./ImmovablePopupDelete.vue";

export default {
  components: {
    ImmovableItem,
    ImmovablePopupEdit,
    ImmovablePopupDelete,
  },
  data() {
    return {
      building: null,
      flat: null,
      isLoading: false,
      error: null,
      deleteBuilding: false,
      editMode: false,
      deleteFlat: false,
      search: false,
      searchQuery: "",
    };
  },
  created() {
    this.loadBuildings();
  },
  methods: {
    serchToggle() {
      this.search = !this.search;
      if (!this.search) this.searchQuery = "";
    },
    deleteToggle() {
      if (this.building) this.deleteBuilding = !this.deleteBuilding;
    },
    deleteToggle2() {
      if (this.flat) this.deleteFlat = !this.deleteFlat;
    },
    editToggle() {
      this.editMode = !this.editMode;
    },
    async loadBuildings() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("immovable/loadBuildings");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    reloadList(status) {
      if (status == "building_ok") {
        this.deleteToggle();
        this.loadBuildings();
      } else if (status == "flat_ok") {
        this.deleteToggle2();
        this.loadBuildings();
      } else if (status == "edit_building_ok") {
        this.editToggle();
        this.loadBuildings();
      } else if (status == "edit_flat_ok") {
        this.editToggle();
        this.loadBuildings();
      }
    },
    findNodeData(node) {
      this.building = null;
      this.flat = null;
      const data = this.getNodes;

      for (const key in data) {
        if (data[key].id == node.id && node.staircase) {
          this.building = data[key];
          break;
        }
        var flag = false;
        for (const key2 in data[key].flats) {
          if (data[key].flats[key2].id == node.id && node.nrStaircase) {
            this.flat = data[key].flats[key2];
            this.flat.building_id = data[key].id;
            flag = true;
            break;
          }
        }
        if (flag == true) break;
      }
    },
  },
  computed: {
    filteredList() {
      const data = this.prepareData.tree_nodes;
      if (data) {
        return data.filter((node) => {
          return node.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.prepareData.tree_nodes;
      }
    },
    immovableBuildingLink() {
      return this.$route.path + "/" + "building";
    },
    immovableFlatLink() {
      if (this.building) {
        return this.$route.path + "/" + this.building.id + "/" + "flat";
      } else {
        return this.$route.path;
      }
    },
    getNodes() {
      return this.$store.getters["immovable/nodes_2"];
    },
    editStatus() {
      return this.$store.getters["immovable/editStatus"];
    },
    hasNodes() {
      return !this.isLoading && this.$store.getters["immovable/hasNodes"];
    },
    tableData() {
      const headers = [
        { text: "Dane", value: "name", width: 50, fixed: true },
        { text: "Wartości", value: "indicator.value" },
      ];
      if (this.building) {
        const items = [
          {
            id: this.building.id,
            name: "Nazwa: ",
            indicator: { value: this.building.name },
          },
          {
            name: "Misto: ",
            indicator: { value: this.building.town },
          },
          {
            name: "Ulica: ",
            indicator: { value: this.building.street },
          },
          {
            name: "Numer budynku: ",
            indicator: { value: this.building.number },
          },
          {
            name: "Kod pocztowy: ",
            indicator: { value: this.building.zipCode },
          },
          {
            name: "Rok budowy: ",
            indicator: { value: this.building.yearConstruction },
          },
          {
            name: "Powierzchnia (m²): ",
            indicator: { value: this.building.areaM2 },
          },
          {
            name: "Ilość pięter: ",
            indicator: { value: this.building.numberStoreys },
          },
          {
            name: "Ilość mieszkań na piętrze: ",
            indicator: { value: this.building.flatsPerStorey },
          },
          {
            name: "Ilość klatek schodowych : ",
            indicator: { value: this.building.staircase },
          },
        ];
        return { headers, items };
      } else if (this.flat) {
        const items = [
          {
            id: this.flat.id,
            name: "Piętro: ",
            indicator: { value: this.flat.storey },
          },
          {
            name: "Numer mieszkania: ",
            indicator: { value: this.flat.number },
          },
          {
            name: "Numer klatki schodowej: ",
            indicator: { value: this.flat.nrStaircase },
          },
          {
            name: "Powierzchnia (m²): ",
            indicator: { value: this.flat.areaM2 },
          },
        ];
        return { headers, items };
      } else {
        return { _: null };
      }
    },
    prepareData() {
      const tree_nodes = [];
      const data = this.getNodes;

      for (const key in data) {
        const tree_node = {
          id: data[key].id,
          name: data[key].name,
          staircase: data[key].staircase,
        };

        data[key].children = [];

        for (const key2 in data[key].flats) {
          const storey = "Piętro " + data[key].flats[key2].storey;

          var isExist = false;

          for (const key3 in data[key].children) {
            const nameExist = data[key].children[key3].name;

            if (nameExist == storey) {
              isExist = true;
              const child = {
                id: data[key].flats[key2].id,
                name: "Lokal " + data[key].flats[key2].number,
                nrStaircase: data[key].flats[key2].nrStaircase,
                number: data[key].flats[key2].number,
              };

              data[key].children[key3].children.push(child);
              break;
            } else {
              isExist = false;
            }
          }

          if (!isExist) {
            const child = {
              name: storey,
              children: [
                {
                  id: data[key].flats[key2].id,
                  name: "Lokal " + data[key].flats[key2].number,
                  nrStaircase: data[key].flats[key2].nrStaircase,
                  number: data[key].flats[key2].number,
                },
              ],
            };
            data[key].children.push(child);
          }
        }

        tree_node.children = data[key].children;
        delete data[key].children;
        tree_nodes.push(tree_node);
      }
      return { tree_nodes };
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.btn-base {
  margin-top: 15px;
}
</style>
