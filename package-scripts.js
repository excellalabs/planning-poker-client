
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    default: {
      script: npsUtils.concurrent.nps('webpack', 'css.types.watch'),
      description: 'Starts webpack dev server.',
    },
    webpack: {
      script: 'node scripts/start.js',
      description: 'Starts webpack dev server.',
    },
    build: {
      script: 'node scripts/build.js',
      description: 'Builds a production bundle of the application.',
    },
    test: {
      script: 'node scripts/test.js',
      description: 'Starts the jest tests for the application.',
      coverage: {
        script: 'nps "test --coverage"',
        description: 'Runs jest tests and gathers coverage.',
      },
    },
    lint: {
      script: 'tslint --project .',
      description: 'Runs tslint for the entire project.',
      fix: {
        script: 'nps "lint --fix"',
        description: 'Runs tslint in fix mode.',
      },
    },
    check: {
      script: 'nps lint && nps test',
      description: 'Runs the checks to validate the application (test & lint).',
    },
    css: {
      types: {
        script: 'tcm -p \'./src/**/*.css\'',
        description: 'Generates typescript typings for css modules.',
        watch: {
          script: 'nps "css.types -w"',
          description: 'Generates typescript typings for css modules in watch mode.',
        },
      },
    },
    graphql: {
      script: 'nps graphql.download graphql.types graphql.schema',
      description: 'Downloads the newest schema and generates typedefs for app queries.',
      download: {
        script: 'apollo schema:download',
        description: 'Downloads the introspection result for the graphql endpoint.'
      },
      schema: {
        script: 'node ./scripts/printSchema.js',
        description: 'Generates `schema.graphql` from `schema.json`.',
      },
      types: {
        script: 'apollo codegen:generate --target typescript',
        description: 'Generates types from graphql queries.',
      },
    },
  },
}
