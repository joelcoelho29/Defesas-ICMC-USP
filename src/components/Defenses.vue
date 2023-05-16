<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        class="mb-4"
        lg="3"
        md="4"
        sm="6"
        v-for="(item, i) in list"
        :key="i"
      >
        <v-card class="mx-auto">
          <v-img
            class="align-end text-white"
            height="300"
            src="https://web.icmc.usp.br/SCAPINST/fotos_pessoas/0.jpg"
            cover
          >
            <v-card-title v-bind:title="item.nome">{{
              item.Nome
            }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4" v-bind="item.programa">{{
            item.Programa
          }}</v-card-subtitle>

          <v-card-actions>
            <v-col cols="auto">
              <v-btn block rounded="lg" size="large" color="teal">
                Ver Detalhes
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const COURSE_SORT_OPTION = "COURSE_SORT";
const YEAR_SORT_OPTION = "YEAR_SORT";

export default {
  name: "DefensesVue",
  data() {
    return {
      nameFilter: "",
      sortOption: "",
      list: [],
    };
  },
  created() {
    this.getDefensesList();
  },
  methods: {
    async getDefensesList() {
      try {
        const response = await axios.get(
          "http://thanos.icmc.usp.br:4567/api/v1/defesas"
        );
        this.list = response.data.items.slice(0, 21);
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    listaFiltradaOrdenada() {
      let filteredList = this.list;

      if (this.nameFilter) {
        filteredList = filteredList.filter((item) =>
          item.Nome.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      }

      switch (this.sortOption) {
        case YEAR_SORT_OPTION:
          filteredList.sort((a, b) => a.Ano - b.Ano);
          break;
        case COURSE_SORT_OPTION:
          filteredList.sort((a, b) => a.Curso.localeCompare(b.Curso));
          break;
      }

      return filteredList;
    },
  },
};
</script>
