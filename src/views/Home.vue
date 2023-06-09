<template>
  <v-app>
    <v-main>
      <div class="container">
        <v-row>
          <v-col class="col-lg-6 col-12">
            <NameFilter
              :modelValue="nameFilter"
              @update:modelValue="nameFilter = $event"
            />
            <SortFilter
              :modelValue="sortOption"
              @update:modelValue="sortOption = $event"
            />
          </v-col>
          <v-col class="col-lg-3 col-md-6 col-12">
            <CourseTypeFilter
              :modelValue="selectedCourses"
              :state="state"
              @update:modelValue="selectedCourses = $event"
              :courseOptions="courseOptions"
            />
          </v-col>
          <v-col class="col-lg-3 col-md-6 col-12">
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
        :MAX_LENGTH="length"
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
import State from "@/models/StateModel.js";
import {
  getDefense,
  getProgramOptions,
  getCourseOptions,
} from "@/services/DefenseService.js";
import filteredAndSortedList from "@/services/FilterAndSortService.js";
import CourseTypeFilter from "@/components/CourseTypeFilter.vue";

const MAX_LENGTH = 24;

export default {
  name: "HomeVue",

  components: {
    Defenses,
    NameFilter,
    SortFilter,
    ProgramFilter,
    CourseTypeFilter,
  },
  data() {
    return {
      nameFilter: "",
      sortOption: SortOption.YEAR_SORT,
      selectedPrograms: [],
      selectedCourses: [],
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
      this.state = State.LOADING;
      const data = await getDefense();
      if (data === null) {
        this.state = State.FAILED;
        return;
      }
      this.database = data;
      this.filteredList = this.database.slice(0, this.length);
      this.programOptions = getProgramOptions().map((program) => ({
        text: program,
        value: program,
      }));
      this.courseOptions = getCourseOptions().map((course) => ({
        text: course,
        value: course,
      }));
      this.state = State.SUCCEEDED;
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
    filteredAndSortedList() {
      return filteredAndSortedList(
        this.database,
        this.nameFilter,
        this.selectedPrograms,
        this.selectedCourses,
        this.sortOption
      ).slice(0, this.length);
    },
  },
};
</script>
