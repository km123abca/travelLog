// const API_URL = "http://localhost:1337";
const API_URL = "https://travel-log-norbutev.herokuapp.com";

export async function listLogEntries() {
  const response = await fetch(API_URL + "/api/logs");
  return response.json();
}

export async function createLogEntry(entry) {
  const apikey = entry.apiKey;
  delete entry.apikey;
  const response = await fetch(API_URL + "/api/logs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apikey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) return json;
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
