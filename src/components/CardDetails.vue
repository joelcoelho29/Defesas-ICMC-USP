<template>
  <v-dialog v-model="modalOpen" max-width="500px">
    <v-card>
      <v-card-title
        class="d-flex justify-center"
        v-bind:title="`${selectedDefense?.Nome}`"
      >
        {{ selectedDefense?.Nome }}
      </v-card-title>

      <v-card-text class="my-5">
        <v-row class="justify-space-between mx-2" :fill="true">
          <p>Ordem</p>
          <v-divider class="my-5"></v-divider>
          <p>{{ `${selectedDefense?.Ordem}` }}</p>
        </v-row>
        <v-row class="justify-space-between mx-2" :fill="true">
          <p>Programa</p>
          <v-divider class="my-5"></v-divider>
          <p>{{ `${selectedDefense?.Programa}` }}</p>
        </v-row>
        <v-row class="justify-space-between mx-2" :fill="true">
          <p>Curso</p>
          <v-divider class="my-5"></v-divider>
          <p>{{ `${selectedDefense?.Curso}` }}</p>
        </v-row>
        <v-row class="justify-space-between mx-2" :fill="true">
          <p>Data</p>
          <v-divider class="mt-5"></v-divider>
          <p>{{ `${selectedDefense?.Data}` }}</p>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-center py-4">
        <v-btn color="#a2ad91" class="white--text" @click="closeModal"
          >Fechar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CardDetails",
  props: {
    defenseDetail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalOpen: false,
      selectedDefense: this.defenseDetail,
    };
  },
  methods: {
    openModal(defense) {
      this.modalOpen = true;
      this.selectedDefense = defense;
    },
    closeModal() {
      this.modalOpen = false;
    },
  },
};
</script>
