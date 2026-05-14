const neo4j = require("neo4j-driver");
require("dotenv").config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME,
    process.env.NEO4J_PASSWORD
  )
);

driver.verifyConnectivity()
  .then(() => console.log("✅ Neo4j Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

module.exports = driver;