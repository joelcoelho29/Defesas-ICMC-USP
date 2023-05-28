<template>
  <v-container>
    <v-radio-group
      :value="modelValue"
      @change="$emit('update:modelValue', $event)"
      class="mt-0"
    >
      <!-- Mapear com enum -->
      <v-radio
        class="mb-0"
        label="Ordenar por curso"
        value="COURSE_SORT"
      ></v-radio>
      <v-radio class="mb-0" label="Ordenar por ano" value="YEAR_SORT"></v-radio>
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
