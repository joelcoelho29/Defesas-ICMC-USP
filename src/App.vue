<template>
  <v-app>
    <v-main>
      <Navbar />
      <div>
        <router-view></router-view>
      </div>
      <v-spacer></v-spacer>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Navbar, Footer },
  mounted() {
    this.updatePageTitle("Defesas - ICMC USP");
  },
  methods: {
    updatePageTitle(title) {
      document.title = title;
    },
  },
};
</script>
