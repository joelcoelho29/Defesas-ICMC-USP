<template>
  <v-text-field
    :value="modelValue"
    @input="debounceSearch($event)"
    label="Digite o nome para filtrar"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "NameFilter",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      searchInput: "",
      timeoutId: null,
    };
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.performSearch(event);
      }, 500);
    },
    performSearch(event) {
      this.$emit("update:modelValue", event);
    },
  },
};
</script>
