<template>
  <v-container>
    <v-radio-group
      :value="modelValue"
      @change="$emit('update:modelValue', $event)"
    >
      <!-- Mapear com enum -->
      <v-radio label="Ordenar por curso" value="COURSE_SORT"></v-radio>
      <v-radio label="Ordenar por ano" value="YEAR_SORT"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  name: "SortFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
