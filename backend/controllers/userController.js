const driver = require("../config/db");


// ✅ Register User
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

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};



// ✅ Recommend Users (WITH SKILLS + SCORE)
exports.getRecommendations = async (req, res) => {
  const { name } = req.params;
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {name: $name})-[:HAS_SKILL]->(s)<-[:HAS_SKILL]-(other)
      WHERE u <> other
      RETURN 
        other.name AS name,
        collect(DISTINCT s.name) AS skills,
        count(s) AS score
      ORDER BY score DESC
      LIMIT 5
      `,
      { name }
    );

    const data = result.records.map(r => ({
      name: r.get("name"),
      skills: r.get("skills"),
      score: r.get("score").toNumber()
    }));

    res.json(data);
  } catch (err) {
    console.error("Recommendation Error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};



// ✅ Search Users by Skill (IMPROVED)
exports.searchBySkill = async (req, res) => {
  const { skill } = req.params;
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User)-[:HAS_SKILL]->(s:Skill)
      WHERE toLower(s.name) CONTAINS toLower($skill)
      RETURN u.name AS name, collect(s.name) AS skills
      `,
      { skill }
    );

    const data = result.records.map(r => ({
      name: r.get("name"),
      skills: r.get("skills")
    }));

    res.json(data);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};



exports.getGraph = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)-[r:HAS_SKILL]->(s:Skill)
      RETURN u, r, s
    `);

    const nodes = [];
    const links = [];

    result.records.forEach(record => {
      const u = record.get("u").properties;
      const s = record.get("s").properties;

      nodes.push({
        id: u.name,
        name: u.name,
        role: u.role,
        type: "user"
      });

      nodes.push({
        id: s.name,
        name: s.name,
        type: "skill"
      });

      links.push({
        source: u.name,
        target: s.name,
        label: "HAS_SKILL"
      });
    });

    const uniqueNodes = Array.from(
      new Map(nodes.map(n => [n.id, n])).values()
    );

    res.json({ nodes: uniqueNodes, links });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    await session.close();
  }
};