<template>
  <header class="header">
    <v-container>
      <v-row class="text-center d-flex align-center">
        <v-col cols="">
          <v-img
            :width="150"
            class="my-3"
            :style="{ cursor: 'pointer' }"
            :src="require('@/assets/logo.svg')"
            @click="navigateToHome"
            contain
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          v-if="this.$route.path !== '/'"
          color="#A2AD91"
          class="white--text mr-6"
          size="x-large"
          @click="navigateToHome"
          >Inicio</v-btn
        >
        <v-btn
          v-else
          color="#A2AD91"
          class="white--text mr-6"
          size="x-large"
          @click="navigateToAbout"
          >Sobre</v-btn
        >
      </v-row>
    </v-container>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    navigateToHome() {
      const desiredRoute = "/";

      if (this.$route.path !== desiredRoute) {
        this.$router.push(desiredRoute);
      }
    },
    navigateToAbout() {
      const desiredRoute = "/about";

      if (this.$route.path !== desiredRoute) {
        this.$router.push(desiredRoute);
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #0a2c57;
  box-shadow: 0px 5px 10px #888888;
}
</style>
