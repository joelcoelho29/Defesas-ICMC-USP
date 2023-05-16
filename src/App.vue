<template>
  <v-app>
    <NavBar />
    <v-main>
      <Defenses />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Defenses from "./components/Defenses";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Defenses,
    NavBar,
    Footer,
  },

  data: () => ({}),
};
</script>
