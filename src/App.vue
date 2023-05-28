<template>
  <v-app>
    <NavBar />
    <v-main>
      <Defenses
        :nameFilter="nameFilter"
        :database="database"
        :loadMore="loadMore"
        :sortOption="sortOption"
      />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Defenses from "./components/Defenses";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

let programOptions = [];
let courseOptions = [];

const SortOption = {
  COURSE_SORT: "COURSE_SORT",
  YEAR_SORT: "YEAR_SORT",
  PROGRAM_SORT: "PROGRAM_SORT",
};

export default {
  name: "App",

  components: {
    Defenses,
    NavBar,
    Footer,
  },

  data() {
    return {
      nameFilter: "",
      sortOption: SortOption.YEAR_SORT,
      length: 20,
      database: [],
    };
  },
  methods: {
    async getDefensesList() {
      try {
        const response = await axios.get(
          "http://thanos.icmc.usp.br:4567/api/v1/defesas"
        );
        this.database = response.data.items;
        this.loadFilterOptions(programOptions, "Programa");
        this.loadFilterOptions(courseOptions, "Curso");
        console.log(programOptions);
        console.log(courseOptions);
      } catch (error) {
        console.error(error);
      }
    },
    loadMore() {
      if (this.length > this.database.length) return;
      this.length += 20;
    },
    loadFilterOptions(optionsArray, attribute) {
      this.database.forEach((element) => {
        if (!optionsArray.includes(element[attribute])) {
          optionsArray.push(element[attribute]);
        }
      });
    },
  },
  created() {
    this.getDefensesList();
  },
  computed: {
    filteredAndSorteredList() {
      let filteredList = this.database;

      if (this.nameFilter) {
        filteredList = filteredList.filter((item) =>
          item.Nome.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      }

      const sortFunctions = {
        [SortOption.YEAR_SORT]: (a, b) => {
          const dateA = Number(a.Data.split("/").reverse().join(""));
          const dateB = Number(b.Data.split("/").reverse().join(""));
          return dateA - dateB;
        },
        [SortOption.COURSE_SORT]: (a, b) => {
          const courseNameA = a.Nome.toUpperCase();
          const courseNameB = b.Nome.toUpperCase();
          return courseNameA.localeCompare(courseNameB);
        },
        [SortOption.PROGRAM_SORT]: (a, b) => {
          const programNameA = a.Nome.toUpperCase();
          const programNameB = b.Nome.toUpperCase();
          return programNameA.localeCompare(programNameB);
        },
      };

      filteredList.sort(sortFunctions[this.sortOption]);

      return filteredList.slice(0, 20);
    },
  },
};
</script>
