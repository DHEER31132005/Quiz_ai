import React, { useEffect, useState } from 'react';
import { fetchHistory, fetchQuiz } from '../services/api';
import HistoryTable from '../components/HistoryTable';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    fetchHistory().then(setHistory);
  }, []);
  const handleDetails = async (id) => {
    const data = await fetchQuiz(id);
    setSelectedQuiz(data);
    setOpen(true);
  };
  return (
    <div className="px-4">
      <HistoryTable data={history} onDetails={handleDetails} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <QuizDisplay data={selectedQuiz} />
      </Modal>
    </div>
  );
}
