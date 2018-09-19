
const { join } = require('path')
const { writeFileSync } = require('fs')
const { printSchema, buildClientSchema } = require('graphql')

let schemaJson, typeDefs
try {
  console.log('Reading `schema.json`...')
  schemaJson = require('../schema.json')
} catch (err) {
  console.error('There was an issue reading schema.json.  Make sure you have already run `npm start graphql.download`.')
  console.error(err)
  process.exit(1)
}

try {
  console.log('Building schema from JSON...')
  const schema = buildClientSchema(schemaJson)

  console.log('Converting schema to GraphQL typeDefs...')
  typeDefs = printSchema(schema, { commentDescriptions: true })
} catch (err) {
  console.error('The contents of schema.json are not valid.  Try re-running `npm start graphql.download` to ensure you have a valid schema.')
  console.error(err)
  process.exit(1)
}

try {
  console.log('Writing typeDefs to `schema.graphql`...')
  writeFileSync(join(__dirname, '../schema.graphql'), typeDefs)
} catch (err) {
  console.error('Failed to write to `schema.graphql`.  Make sure you have permissions to write to this file.')
  console.error(err)
  process.exit(1)
}

console.log('Done!')
