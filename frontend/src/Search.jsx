import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [skill, setSkill] = useState("");
  const [data, setData] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:8000/api/search/${skill}`);
    setData(res.data);
  };

  return (
    <div>
      <h2>Search by Skill</h2>
      <input onChange={e => setSkill(e.target.value)} placeholder="Skill" />
      <button onClick={search}>Search</button>

      {data.map((u, i) => (
        <p key={i}>{u.name}</p>
      ))}
    </div>
  );
}