<template>
  <div>
    <div class="text-h6 text-center">Filtrar por Curso</div>
    <div v-if="isLoading" class="d-flex align-center justify-center py-8">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </div>
    <div
      v-else-if="hasFailed"
      class="d-flex flex-column text-center justify-center"
    >
      <div color="primary">
        Ocorreu um erro carregando a lista de cursos, tente novamente
      </div>
    </div>
    <v-btn-toggle
      v-model="selectedCourses"
      multiple
      class="my-4 d-flex justify-center"
      @change="updateFilter"
    >
      <v-btn
        v-for="course in loadCourses"
        :key="course.value"
        :value="course.value"
        :class="{ 'primary--text': selectedCourses.includes(course.value) }"
      >
        {{ course.text }}
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
    courseOptions: {
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
      selectedCourses: this.modelValue,
    };
  },
  methods: {
    updateFilter() {
      this.$emit("update:modelValue", this.selectedCourses);
    },
  },
  computed: {
    loadCourses() {
      return this.courseOptions;
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
