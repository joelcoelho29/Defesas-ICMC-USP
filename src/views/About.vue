<template>
  <div max-width="800">
    <p class="text-h3 d-flex justify-center my-8">Sobre</p>
    <v-container>
      <v-row
        class="justify-space-between"
        v-for="member in members"
        :key="member.nusp"
        :fill="true"
      >
        <span>{{ member.name }}</span>
        <v-divider class="my-5"></v-divider>
        <span>{{ member.nusp }}</span>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutVue",

  data() {
    return {
      members: [
        {
          name: "João Lucas Pereira e Sousa",
          nusp: 10994311,
          github: "https://github.com/joaolucasp",
        },
        {
          name: "Joel Felipe Coelho",
          nusp: 4865826,
          github: "https://github.com/joelcoelho29",
        },
        {
          name: "Ryan Souza Sá Teles",
          nusp: 12822062,
          github: "https://github.com/ryrden",
        },
      ],
    };
  },
};
</script>
