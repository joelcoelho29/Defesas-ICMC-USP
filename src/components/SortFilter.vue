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
export default {
  name: "SortFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      sortOptions: [
        { text: "Ano (Crescente)", value: "YEAR_SORT" },
        { text: "Curso (Crescente)", value: "COURSE_SORT" },
        { text: "Nome (Crescente)", value: "NAME_SORT" },
      ],
    };
  },
};
</script>
