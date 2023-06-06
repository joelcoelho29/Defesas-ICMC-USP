import SortOption from "@/models/SortOptionModel.js";

function filterByName(filteredList, nameFilter) {
  if (nameFilter) {
    return filteredList.filter((item) =>
      item.Nome.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
  return filteredList;
}

function filterBySelectedPrograms(filteredList, selectedPrograms) {
  if (selectedPrograms.length) {
    return filteredList.filter((item) =>
      selectedPrograms.includes(item.Programa)
    );
  }
  return filteredList;
}

function filterBySelectedCourses(filteredList, selectedCourses) {
  if (selectedCourses.length) {
    return filteredList.filter((item) => selectedCourses.includes(item.Curso));
  }
  return filteredList;
}

function sortFilteredList(filteredList, sortOption) {
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

  filteredList.sort(sortFunctions[sortOption]);

  return filteredList;
}

function filteredAndSortedList(
  database,
  nameFilter,
  selectedPrograms,
  selectedCourses,
  sortOption
) {
  let filteredList = [...database];
  filteredList = filterByName(filteredList, nameFilter);
  filteredList = filterBySelectedPrograms(filteredList, selectedPrograms);
  filteredList = filterBySelectedCourses(filteredList, selectedCourses);
  filteredList = sortFilteredList(filteredList, sortOption);
  return filteredList;
}

export default filteredAndSortedList;
