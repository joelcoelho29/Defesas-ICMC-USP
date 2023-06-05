<template>
  <v-app>
    <v-main>
      <div class="container">
        <v-row class="flex-sm-column flex-lg-row">
          <v-col>
            <NameFilter
              :modelValue="nameFilter"
              @update:modelValue="nameFilter = $event"
            />
            <SortFilter
              :modelValue="sortOption"
              @update:modelValue="sortOption = $event"
            />
          </v-col>
          <v-col>
            <ProgramFilter
              :modelValue="selectedPrograms"
              :state="state"
              @update:modelValue="selectedPrograms = $event"
              :programsOptions="programOptions"
            />
          </v-col>
        </v-row>
      </div>
      <Defenses
        :database="filteredAndSortedList"
        :totalLength="totalLength"
        :loadMore="loadMore"
        :state="state"
        :retry="getDefensesList"
      />
    </v-main>
  </v-app>
</template>

<script>
import Defenses from "@/components/Defenses.vue";
import NameFilter from "@/components/NameFilter.vue";
import SortFilter from "@/components/SortFilter.vue";
import ProgramFilter from "@/components/ProgramFilter.vue";
import SortOption from "@/models/SortOptionModel.js";
import axios from "axios";

const MAX_LENGTH = 24;
export const State = {
  IDLE: 0,
  LOADING: 1,
  FAILED: 2,
  SUCCEEDED: 3,
};

export default {
  name: "HomeVue",

  components: {
    Defenses,
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
      length: MAX_LENGTH,
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
          "http://thanos.icmc.usp.br:4567/api/v1/defesas",
          {
            timeout: 10000, // 10s
          }
        );
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
        this.state = State.SUCCEEDED;
      } catch (error) {
        console.error(error);
        this.state = State.FAILED;
      }
    },
    loadMore() {
      if (this.length > this.database.length) return;
      this.length += MAX_LENGTH;
      this.filteredList = this.database.slice(0, this.length);
    },
  },
  created() {
    this.getDefensesList();
  },
  computed: {
    totalLength() {
      return this.database.length;
    },
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
        [SortOption.YEAR_SORT_ASC]: (a, b) => {
          const dateA = Number(a.Data.split("/").reverse().join(""));
          const dateB = Number(b.Data.split("/").reverse().join(""));
          return dateA - dateB;
        },
        [SortOption.YEAR_SORT_DESC]: (a, b) => {
          const dateA = Number(a.Data.split("/").reverse().join(""));
          const dateB = Number(b.Data.split("/").reverse().join(""));
          return dateB - dateA;
        },
        [SortOption.COURSE_SORT_ASC]: (a, b) => {
          const courseNameA = a.Curso.toUpperCase();
          const courseNameB = b.Curso.toUpperCase();
          return courseNameA.localeCompare(courseNameB);
        },
        [SortOption.COURSE_SORT_DESC]: (a, b) => {
          const courseNameA = a.Curso.toUpperCase();
          const courseNameB = b.Curso.toUpperCase();
          return courseNameB.localeCompare(courseNameA);
        },
        [SortOption.NAME_SORT_ASC]: (a, b) => {
          const nameA = a.Nome.toUpperCase();
          const nameB = b.Nome.toUpperCase();
          return nameA.localeCompare(nameB);
        },
        [SortOption.NAME_SORT_DESC]: (a, b) => {
          const nameA = a.Nome.toUpperCase();
          const nameB = b.Nome.toUpperCase();
          return nameB.localeCompare(nameA);
        },
      };

      filteredList.sort(sortFunctions[this.sortOption]);

      return filteredList.slice(0, this.length);
    },
  },
};
</script>
