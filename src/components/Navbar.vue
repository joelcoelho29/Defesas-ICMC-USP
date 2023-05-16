<template>
  <v-app-bar color="primary">
    <v-img
      class="mx-2"
      :src="require('@/assets/logo.svg')"
      max-height="40"
      max-width="40"
      contain
    ></v-img>

    <v-toolbar-title class="ml-2"
      >Sistema de Busca de Pós-graduação</v-toolbar-title
    >
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
