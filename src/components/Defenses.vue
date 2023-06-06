<template>
  <v-container>
    <CardDetails :defenseDetail="selectedDefense" ref="childRef" />

    <v-container v-if="isLoading" class="d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>

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
      <div
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
            <v-card class="mx-auto" width="100%">
              <v-img
                src="@/assets/person.svg"
                class="align-start"
                style="background-color: #f5f5f5"
                contain
                height="15em"
              ></v-img>

              <v-card-title
                v-bind:title="`${item.Ordem} ${item.Nome}`"
                class="d-flex justify-center"
              >
                <!-- Primeiro e ultimo nome -->
                {{ item.Nome.split(" ")[0] }} {{ item.Nome.split(" ").pop() }}
              </v-card-title>

              <v-card-text class="d-flex justify-center">
                <v-chip v-bind:title="`${item.Curso}`" color="#A2AD91">
                  {{ item.Curso }}
                </v-chip>
                <v-chip
                  class="ml-4 white--text"
                  v-bind:title="`${item.Programa}`"
                  color="#3A2D32"
                >
                  {{ item.Programa }}
                </v-chip>
                <v-chip
                  class="ml-4"
                  v-bind:title="`${item.Data}`"
                  color="#BFCDE0"
                >
                  {{ item.Data.split("/").pop() }}
                </v-chip>
              </v-card-text>

              <v-card-actions class="d-flex justify-center">
                <v-btn
                  width="100%"
                  class="white--text"
                  color="#0a2c57"
                  tonal
                  @click="openModal(item)"
                >
                  Ver detalhes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          v-if="database.length >= MAX_LENGTH"
          @click="loadMore"
          outlined
          class="d-flex justify-center mx-auto"
          width="30%"
          style="color: #a2ad91; font-weight: bold"
          >Ver mais</v-btn
        >
      </div>

      <v-text v-else color="primary">Não foram econtradas defesas.</v-text>
    </v-container>
  </v-container>
</template>

<script>
import State from "@/models/StateModel.js";
import CardDetails from "@/components/CardDetails.vue";

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
    MAX_LENGTH: {
      type: Number,
      required: true,
    },
  },
  components: { CardDetails },
  computed: {
    isLoading() {
      return this.state === State.LOADING;
    },
    hasFailed() {
      return this.state === State.FAILED;
    },
  },
  data() {
    return {
      selectedDefense: {},
    };
  },
  methods: {
    openModal(item) {
      this.$refs.childRef.openModal(item);
    },
  },
};
</script>
