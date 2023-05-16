<template>
  <v-container class="d-flex flex-column align-center">
    <v-row class="text-center">
      <v-col cols="">
        <v-img
          :width="300"
          class="my-3"
          :src="require('@/assets/logo.svg')"
          contain
        ></v-img>
      </v-col>
    </v-row>
    <nav v-bind:class="active" v-on:click.prevent>
      <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
      <a href="#" class="projects" v-on:click="makeActive('projects')"
        >Projects</a
      >
      <a href="#" class="services" v-on:click="makeActive('services')"
        >Services</a
      >
      <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
    </nav>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",

  data: () => {
    return {
      active: "home",
    };
  },
  methods: {
    makeActive: function (item) {
      // When a model is changed, the view will be automatically updated.
      this.active = item;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: inline-block;
  margin: 60px auto 45px;
  background-color: #5597b4;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
}

nav a {
  display: inline-block;
  padding: 18px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  text-transform: uppercase;
  background-color: transparent;

  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.25s;
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact {
  background-color: #e35885;
}

p {
  font-size: 22px;
  font-weight: bold;
  color: #7d9098;
}

p b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}
</style>
