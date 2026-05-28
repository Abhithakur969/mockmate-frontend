import axios from "axios";

// Automatically targets your local engine
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function gradeAnswer({ question, answer, role }) {
  // Explicitly defining Content-Type and Accept headers prevents Vite/Browser CSP
  // from attempting to eval() or sniff the response as an executable script.
  const { data } = await axios.post(
    `${BASE}/api/grade`,
    {
      question,
      answer,
      role,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return data;
}

export async function getGradeHistory() {
  const { data } = await axios.get(`${BASE}/api/grade`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
}
