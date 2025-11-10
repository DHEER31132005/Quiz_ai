import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const generateQuiz = async (url) => {
  const res = await axios.post(`${BASE_URL}/generate_quiz`, { url });
  return res.data;
};

export const fetchHistory = async () => {
  const res = await axios.get(`${BASE_URL}/history`);
  return res.data;
};

export const fetchQuiz = async (id) => {
  const res = await axios.get(`${BASE_URL}/quiz/${id}`);
  return res.data;
};
