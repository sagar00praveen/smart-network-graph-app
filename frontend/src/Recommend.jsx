import { useState } from "react";
import axios from "axios";

export default function Recommend() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(`http://localhost:8000/api/recommend/${name}`);
    setData(res.data);
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <input onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={getData}>Get</button>

      {data.map((u, i) => (
        <div key={i}>
          <b>{u.name}</b>
          <p>{u.skills.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}