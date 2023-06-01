<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-card class="not-found-card" outlined>
        <v-card-title class="not-found-title">
          Página não encontrada
        </v-card-title>
        <v-card-text class="not-found-text">
          A página que você está procurando não existe.
        </v-card-text>
        <v-card-actions class="not-found-actions">
          <v-btn to="/">Voltar para a página inicial</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.not-found-card {
  max-width: 400px;
  margin-top: 100px;
  padding: 20px;
  text-align: center;
}

.not-found-title {
  font-size: 24px;
}

.not-found-text {
  margin-top: 20px;
}

.not-found-actions {
  margin-top: 20px;
}
</style>
