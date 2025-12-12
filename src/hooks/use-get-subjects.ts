export async function GetAllSubjects() {
  const response = await fetch("/api/subjects", { method: "GET" });
  const data = await response.json();

  return data;
}
