import axios from "axios";

// Automatically targets your local engine, or uses whatever your environment configuration establishes
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function gradeAnswer({ question, answer, role }) {
  const { data } = await axios.post(`${BASE}/api/grade`, {
    question,
    answer,
    role,
  });
  return data;
}

export async function getGradeHistory() {
  // Cleared evaluation syntax block to correctly read history streams
  const { data } = await axios.get(`${BASE}/api/grade`);
  return data;
}
