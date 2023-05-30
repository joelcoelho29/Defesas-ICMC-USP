<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="container d-lg-flex">
        <NameFilter
          :modelValue="nameFilter"
          @update:modelValue="nameFilter = $event"
        />
        <SortFilter
          :modelValue="sortOption"
          @update:modelValue="sortOption = $event"
        />
        <ProgramFilter
          :modelValue="selectedPrograms"
          :state="state"
          @update:modelValue="selectedPrograms = $event"
          :programsOptions="programOptions"
        />
      </v-container>
      <Defenses
        :database="filteredAndSortedList"
        :loadMore="loadMore"
        :state="state"
        :retry="getDefensesList"
      />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Defenses from "./components/Defenses";
import NameFilter from "./components/NameFilter";
import SortFilter from "./components/SortFilter";
import ProgramFilter from "./components/ProgramFilter";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

const SortOption = {
  COURSE_SORT: "COURSE_SORT",
  YEAR_SORT: "YEAR_SORT",
  PROGRAM_SORT: "PROGRAM_SORT",
};

export const State = {
  IDLE: 0,
  LOADING: 1,
  FAILED: 2,
  SUCCEEDED: 3,
};

export default {
  name: "App",

  components: {
    Defenses,
    NavBar,
    Footer,
    NameFilter,
    SortFilter,
    ProgramFilter,
  },

  data() {
    return {
      nameFilter: "",
      sortOption: SortOption.YEAR_SORT,
      selectedPrograms: [],
      programOptions: [],
      courseOptions: [],
      length: 20,
      database: [],
      filteredList: [],
      state: State.IDLE,
    };
  },
  methods: {
    async getDefensesList() {
      try {
        this.state = State.LOADING;
        const response = await axios.get(
          "http://thanos.icmc.usp.br:4567/api/v1/defesas"
        );
        // const response = await axios.get(
        //   "http://localhost:3000/api/v1/defesas"
        // );
        this.database = response.data.items;
        this.filteredList = this.database.slice(0, this.length);
        const programOptions = new Set();
        const courseOptions = new Set();
        this.database.forEach((element) => {
          programOptions.add(element.Programa);
          courseOptions.add(element.Curso);
        });
        this.programOptions = Array.from(programOptions).map((program) => ({
          text: program,
          value: program,
        }));
        this.courseOptions = Array.from(courseOptions);
        console.log(this.programOptions);
        console.log(this.courseOptions);
        this.state = State.SUCCEEDED;
      } catch (error) {
        console.error(error);
        this.state = State.FAILED;
      }
    },
    loadMore() {
      if (this.length > this.database.length) return;
      this.length += 20;
      this.filteredList = this.database.slice(0, this.length);
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

      if (this.selectedPrograms.length) {
        filteredList = filteredList.filter((item) =>
          this.selectedPrograms.includes(item.Programa)
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
