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

export default {
  name: "DefensesVue",
  data() {
    return {
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
    sortByYear() {
      function compareByYear(a, b) {
        return a.ano - b.ano;
      }
      this.list.sort(compareByYear);
    },
    sortByCourse() {
      const compareByCourseName = (a, b) => {
        const courseNameA = a.Nome.toUpperCase();
        const courseNameB = b.Nome.toUpperCase();

        if (courseNameA < courseNameB) {
          return -1;
        } else if (courseNameA > courseNameB) {
          return 1;
        } else {
          return 0;
        }
      };

      this.list.sort(compareByCourseName);
    },
    filterByStudentName(studentName) {
      this.list.filter((item) => {
        return item.Nome.toLowerCase().includes(studentName.toLowerCase());
      });
    },
  },
};
</script>
