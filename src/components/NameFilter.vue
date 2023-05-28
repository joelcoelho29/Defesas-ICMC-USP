<template>
  <v-container>
    <v-text-field
      :value="modelValue"
      @input="$emit('update:modelValue', $event)"
      label="Digite o nome para filtrar"
      outlined
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  name: "NameFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
