<template>
  <v-container>
    <v-text-field
      v-model="nameFilter"
      label="Digite o nome para filtrar"
      outlined
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  name: "NameFilter",
  props: {
    database: {
      type: Array,
      required: true,
    },
    filteredList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      nameFilter: "",
    };
  },
  computed: {
    filteredAndSorteredList() {
      if (this.nameFilter) {
        return this.database.filter((item) =>
          item.Nome.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      } else {
        return this.database;
      }
    },
  },
};
</script>
