import { useEffect, useState } from "react";

export default function Teams() {
  const [teams, setTeams] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/list-teams.php")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response.status);
        }
      })
      .then((data) => setTeams(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <h1>Teams</h1>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </>
  );
}
