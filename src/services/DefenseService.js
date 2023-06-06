import api from "./axios";

let database = [];
let programOptions = [];
let courseOptions = [];

const getDefense = async () => {
  try {
    if (database.length > 0) {
      return database;
    }
    const response = await api.get("/defesas", { timeout: 10000 });
    database = response.data.items;
    return database;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getOptions = (options, property) => {
  if (options.length > 0) {
    return options;
  }
  const temp = new Set();
  database.forEach((defense) => {
    temp.add(defense[property]);
  });
  options = Array.from(temp);
  return options;
};

const getProgramOptions = () => {
  return getOptions(programOptions, "Programa");
};

const getCourseOptions = () => {
  return getOptions(courseOptions, "Curso");
};

export { getDefense, getProgramOptions, getCourseOptions };
