<template>
  <v-container>
    <v-text-field
      v-model="nameFilter"
      label="Digite o nome para filtrar"
      outlined
    ></v-text-field>

    <v-radio-group v-model="sortOption">
      <!-- Mapear com enum -->
      <v-radio label="Ordenar por curso" value="COURSE_SORT"></v-radio>
      <v-radio label="Ordenar por ano" value="YEAR_SORT"></v-radio>
    </v-radio-group>
    <v-container class="d-flex flex-column text-center justify-center">
      <v-row class="text-center">
        <v-col
          class="mb-4"
          lg="3"
          md="4"
          sm="6"
          v-for="(item, i) in filteredAndSorteredList"
          :key="i"
        >
          <v-card class="mx-auto" height="380">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
              cover
            ></v-img>

            <v-card-title
              v-bind:title="`${item.Ordem} ${item.Nome}`"
              class="text-center"
            >
              #{{ item.Ordem }} {{ item.Nome }}
            </v-card-title>

            <v-card-subtitle class="pt-4" v-bind="item.Programa">{{
              item.Programa
            }}</v-card-subtitle>

            <v-card-actions>
              <v-col cols="12">
                <v-btn class="full-width" color="teal" variant="text">
                  Ver detalhes
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="loadMore" density="compact" variant="elevated"
        >Ver mais</v-btn
      >
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Defense } from "@/services/http-service";
import axios from "axios";

enum SortOption {
  COURSE_SORT = "COURSE_SORT",
  YEAR_SORT = "YEAR_SORT",
}

type vueDataType = {
  nameFilter: string;
  sortOption: SortOption;
  length: number;
  database: Defense[];
};

export default {
  name: "DefensesVue",
  data(): vueDataType {
    return {
      nameFilter: "",
      sortOption: SortOption.YEAR_SORT,
      length: 20,
      database: [],
    };
  },
  methods: {
    async getDefensesList() {
      try {
        const response = await axios.get(
          "http://thanos.icmc.usp.br:4567/api/v1/defesas"
        );
        this.database = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
    loadMore() {
      if (this.length > this.database.length) return;
      this.length += 20;
    },
  },
  created() {
    this.getDefensesList();
  },
  computed: {
    filteredAndSorteredList(): Defense[] {
      let filteredList = this.database;

      if (this.nameFilter) {
        filteredList = filteredList.filter((item: Defense) =>
          item.Nome.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      }

      type FilterSort = {
        [key in SortOption]: (a: Defense, b: Defense) => number;
      };

      const sortFunctions: FilterSort = {
        [SortOption.YEAR_SORT]: (a, b) => {
          const dateA = Number(a.Data.split("/").reverse().join(""));
          const dateB = Number(b.Data.split("/").reverse().join(""));
          return dateA - dateB;
        },
        [SortOption.COURSE_SORT]: (a, b) => {
          const courseNameA = a.Nome.toUpperCase();
          const courseNameB = b.Nome.toUpperCase();
          return courseNameA.localeCompare(courseNameB);
        },
      };

      filteredList.sort(sortFunctions[this.sortOption]);

      return filteredList.slice(0, this.length);
    },
  },
  filters: {
    truncate(name: string, maxLength: number) {
      if (name.length <= maxLength) {
        return name;
      } else {
        return name.split(" ").splice(0, maxLength).join(" ");
      }
    },
  },
};
</script>
