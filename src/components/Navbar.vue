<template>
  <v-container class="d-flex flex-column align-center">
    <v-row class="text-center">
      <v-col cols="">
        <v-img
          :width="200"
          class="my-3"
          :src="require('@/assets/logo.svg')"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
