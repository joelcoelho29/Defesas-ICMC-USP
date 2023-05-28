<template>
  <v-container>
    <v-container class="d-flex flex-column text-center justify-center">
      <v-row class="text-center">
        <v-col
          class="mb-4"
          lg="3"
          md="4"
          sm="6"
          v-for="(item, i) in database"
          :key="i"
        >
          <v-card class="mx-auto" height="380">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
              cover
            ></v-img>

            <v-card-title
              v-bind:title="`${item.Ordem} ${item.Nome}`"
              class="text-center"
            >
              #{{ item.Ordem }} {{ item.Nome }}
            </v-card-title>

            <v-card-subtitle class="pt-4" v-bind="item.Programa">
              Programa {{ item.Programa }}</v-card-subtitle
            >

            <v-card-actions>
              <v-col cols="12">
                <v-btn class="full-width" color="teal" variant="text">
                  Ver detalhes
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="loadMore" density="compact" variant="elevated"
        >Ver mais</v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "DefensesVue",
  props: {
    database: {
      type: Array,
      required: true,
    },
    loadMore: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.tag-mat {
  background-color: transparent;
}
</style>
