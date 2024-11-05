const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    viewportHeight: 880,
    viewportWidth: 1280,
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
