<template>
  <v-text-field
    class=""
    :value="modelValue"
    @input="$emit('update:modelValue', $event)"
    label="Digite o nome para filtrar"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "NameFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
