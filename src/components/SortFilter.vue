<template>
  <v-select
    :items="sortOptions"
    label="Ordenar por"
    outlined
    dense
    color="primary"
    :value="modelValue"
    @change="$emit('update:modelValue', $event)"
  ></v-select>
</template>

<script>
import SortOption from "@/models/SortOptionModel.js";
export default {
  name: "SortFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      sortOptions: [
        { text: "Ano (Crescente)", value: SortOption.YEAR_SORT_ASC },
        { text: "Ano (Decrescente)", value: SortOption.YEAR_SORT_DESC },
        { text: "Curso (Crescente)", value: SortOption.COURSE_SORT_ASC },
        { text: "Curso (Decrescente)", value: SortOption.COURSE_SORT_DESC },
        { text: "Nome (Crescente)", value: SortOption.NAME_SORT_ASC },
        { text: "Nome (Decrescente)", value: SortOption.NAME_SORT_DESC },
      ],
    };
  },
};
</script>
