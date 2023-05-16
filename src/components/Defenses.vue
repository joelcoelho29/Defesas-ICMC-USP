<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <a v-for="(item, i) in list" :key="i" class="subheading mx-3">
          <v-card>
            <v-card-title v-bind:title="item.nome">{{
              item.Nome
            }}</v-card-title>
            <v-card-text>...</v-card-text>
            <v-card-actions>
              <v-btn>Ver detalhes</v-btn>
            </v-card-actions>
          </v-card>
        </a>
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
        this.list = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
