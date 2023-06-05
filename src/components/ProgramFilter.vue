<template>
  <div>
    <div class="text-h6 text-center">Filtrar por Programa</div>
    <div v-if="isLoading" class="d-flex align-center justify-center py-8">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </div>
    <div
      v-else-if="hasFailed"
      class="d-flex flex-column text-center justify-center"
    >
      <v-text color="primary"
        >Ocorreu um erro carregando a lista de programas, tente
        novamente</v-text
      >
    </div>
    <v-btn-toggle
      v-model="selectedPrograms"
      multiple
      class="my-4 d-flex justify-center"
      @change="updateFilter"
    >
      <v-btn
        v-for="program in loadPrograms"
        :key="program.value"
        :value="program.value"
        :class="{ 'primary--text': selectedPrograms.includes(program.value) }"
      >
        {{ program.text }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import State from "@/models/StateModel.js";

export default {
  name: "ProgramFilter",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    programsOptions: {
      type: Array,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedPrograms: this.modelValue,
    };
  },
  methods: {
    updateFilter() {
      this.$emit("update:modelValue", this.selectedPrograms);
    },
  },
  computed: {
    loadPrograms() {
      return this.programsOptions;
    },
    isLoading() {
      return this.state === State.LOADING;
    },
    hasFailed() {
      return this.state === State.FAILED;
    },
  },
};
</script>
