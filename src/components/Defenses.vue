<template>
  <v-container>
    <v-dialog v-model="modalOpen" max-width="500px">
      <v-card>
        <v-card-title v-bind:title="`${selectedDefense?.Nome}`">
          {{ selectedDefense?.Nome }}
        </v-card-title>

        <v-card-text class="my-5">
          <v-row class="justify-space-between mx-2" :fill="true">
            <v-text>Ordem</v-text>
            <v-text>{{ `${selectedDefense?.Ordem}` }}</v-text>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-row class="justify-space-between mx-2" :fill="true">
            <v-text>Programa</v-text>
            <v-text>{{ `${selectedDefense?.Programa}` }}</v-text>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-row class="justify-space-between mx-2" :fill="true">
            <v-text>Curso</v-text>
            <v-text>{{ `${selectedDefense?.Curso}` }}</v-text>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-row class="justify-space-between mx-2" :fill="true">
            <v-text>Data</v-text>
            <v-text>{{ `${selectedDefense?.Data}` }}</v-text>
          </v-row>
          <v-divider class="mt-5"></v-divider>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="closeModal">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="isLoading" class="d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-container
      v-else-if="hasFailed"
      class="d-flex flex-column text-center justify-center"
    >
      <v-text color="primary"
        >Ocorreu um erro carregando a lista de defesas</v-text
      >
      <v-btn @click="retry" density="compact" variant="elevated"
        >Tentar novamente</v-btn
      >
    </v-container>

    <v-container v-else>
      <v-container
        v-if="database.length > 0"
        class="d-flex flex-column text-center justify-center"
      >
        <v-row class="text-center">
          <v-col
            class="mb-4"
            lg="3"
            md="4"
            sm="6"
            v-for="(item, i) in database"
            :key="i"
          >
            <v-card class="mx-auto">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
                cover
              ></v-img>

              <v-card-title
                v-bind:title="`${item.Ordem} ${item.Nome}`"
                class="text-center"
              >
                <!-- Primeiro e ultimo nome -->
                {{ item.Nome.split(" ")[0] }} {{ item.Nome.split(" ").pop() }}
              </v-card-title>

              <v-card-text>
                <v-chip v-bind:title="`${item.Programa}`">
                  {{ item.Programa }}
                </v-chip>
              </v-card-text>

              <v-card-actions>
                <v-col cols="12">
                  <v-btn
                    class="full-width"
                    color="teal"
                    variant="text"
                    @click="openModal(item)"
                  >
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

      <v-text v-else color="primary">0 defesas encontradas</v-text>
    </v-container>
  </v-container>
</template>

<script>
import { State } from "@/App.vue";

export default {
  name: "DefensesVue",
  props: {
    database: {
      type: Array,
      required: true,
    },
    loadMore: {
      type: Function,
      required: true,
    },
    retry: {
      type: Function,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      modalOpen: false,
      selectedDefense: null,
    };
  },
  methods: {
    openModal(defense) {
      this.modalOpen = true;
      this.selectedDefense = defense;
    },
    closeModal() {
      this.modalOpen = false;
      this.selectedDefense = null;
    },
  },
  computed: {
    isLoading() {
      return this.state === State.LOADING;
    },
    hasFailed() {
      return this.state === State.FAILED;
    },
  },
};
</script>

<style scoped>
.tag-mat {
  background-color: transparent;
}
</style>
