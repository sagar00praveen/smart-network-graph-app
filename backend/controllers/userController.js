const driver = require("../config/db");

// Register User
exports.registerUser = async (req, res) => {
  const { name, role, skills } = req.body;
  const session = driver.session();

  try {
    await session.run(
      `
      MERGE (u:User {name: $name})
      SET u.role = $role
      WITH u
      UNWIND $skills AS skill
      MERGE (s:Skill {name: skill})
      MERGE (u)-[:HAS_SKILL]->(s)
      `,
      { name, role, skills }
    );

    res.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    await session.close();
  }
};

// Recommend Users
exports.getRecommendations = async (req, res) => {
  const { name } = req.params;
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {name: $name})-[:HAS_SKILL]->(s)<-[:HAS_SKILL]-(other)
      WHERE u <> other
      RETURN other.name AS name, collect(s.name) AS skills
      LIMIT 5
      `,
      { name }
    );

    const data = result.records.map(r => ({
      name: r.get("name"),
      skills: r.get("skills")
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    await session.close();
  }
};

// Search by Skill
exports.searchBySkill = async (req, res) => {
  const { skill } = req.params;
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User)-[:HAS_SKILL]->(s:Skill {name: $skill})
      RETURN u.name AS name
      `,
      { skill }
    );

    const data = result.records.map(r => ({
      name: r.get("name")
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    await session.close();
  }
};