<template>
  <v-footer id="footer" class="py-4">
    <v-row justify="center" no-gutters>
      <v-col class="text-center mt-4" cols="12">
        <span>
          {{ new Date().getFullYear() }}
          — <strong>SSC0961 - Desenvolvimento Web e Mobile</strong>
        </span>
        <v-icon class="ml-2">mdi-heart-outline</v-icon>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterView",
};
</script>

<style scoped>
#footer {
  position: sticky;
  top: 100vh;
  background-color: #bfcde0;
}
</style>
