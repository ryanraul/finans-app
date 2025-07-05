export default {
  "finans-api": {
    output: {
      mode: "single",
      target: "./src/__generated__/api.ts",
      schemas: "./src/__generated__/types",
      override: {
        mutator: {
          path: "./src/services/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "http://localhost:5285/openapi/v1.json",
    },
  },
};
