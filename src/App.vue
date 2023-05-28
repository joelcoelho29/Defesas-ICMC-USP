<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="container d-flex">
        <NameFilter
          :modelValue="nameFilter"
          @update:modelValue="nameFilter = $event"
        />
        <SortFilter
          :modelValue="sortOption"
          @update:modelValue="sortOption = $event"
        />
      </v-container>
      <Defenses :database="filteredAndSortedList" :loadMore="loadMore" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Defenses from "./components/Defenses";
import NameFilter from "./components/NameFilter";
import SortFilter from "./components/SortFilter";
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
    NameFilter,
    SortFilter,
  },

  data() {
    return {
      nameFilter: "",
      sortOption: SortOption.YEAR_SORT,
      length: 20,
      database: [],
      filteredList: [],
    };
  },
  methods: {
    async getDefensesList() {
      try {
        const response = await axios.get(
          "http://thanos.icmc.usp.br:4567/api/v1/defesas"
        );
        this.database = response.data.items;
        this.filteredList = this.database.slice(0, this.length);
        this.loadFilterOptions(programOptions, "Programa");
        this.loadFilterOptions(courseOptions, "Curso");
      } catch (error) {
        console.error(error);
      }
    },
    loadMore() {
      if (this.length > this.database.length) return;
      this.length += 20;
      this.filteredList = this.database.slice(0, this.length);
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
    filteredAndSortedList() {
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
      };

      filteredList.sort(sortFunctions[this.sortOption]);

      return filteredList.slice(0, this.length);
    },
  },
};
</script>
