const time = (name) => {
  if (process.env.IS_OFFLINE) {
    console.time(name);
  }
};

const timeLog = (name) => {
  if (process.env.IS_OFFLINE) {
    console.timeLog(name);
  }
};
