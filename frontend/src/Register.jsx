import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");

  const submit = async () => {
    await axios.post("http://localhost:8000/api/register", {
      name,
      role,
      skills: skills.split(",")
    });
    alert("User added");
  };

  return (
    <div style={{ maxWidth: "400px" }}>
  <h2>Register</h2>

  <input placeholder="Name" onChange={e => setName(e.target.value)} />
  <input placeholder="Role" onChange={e => setRole(e.target.value)} />
  <input placeholder="Skills" onChange={e => setSkills(e.target.value)} />

  <button onClick={submit}>Submit</button>
</div>
  );
}