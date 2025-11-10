import React, { useState } from 'react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

export default function GenerateQuizTab() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hideAnswers, setHideAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);
    setScore(null);
    try {
      const res = await generateQuiz(url.trim());
      setData(res);
    } catch (err) {
      alert("Invalid Wikipedia URL or Error Generating Quiz");
    }
    setLoading(false);
  };

  const handleQuizSubmit = () => {
    let sc = 0;
    data.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) sc += 1;
    });
    setScore(sc + " / " + data.quiz.length);
    setHideAnswers(false);
  };

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="url"
          pattern="https://en.wikipedia.org/wiki/.*"
          required
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="border p-2 rounded flex-grow"
          placeholder="Paste Wikipedia URL"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate Quiz</button>
      </form>
      {loading && <div>Loading...</div>}
      {data &&
        <div>
          <div className="flex gap-2 my-2">
            <label>
              <input
                type="checkbox"
                checked={hideAnswers}
                onChange={(e) => {
                  setHideAnswers(e.target.checked);
                  setUserAnswers({});
                  setScore(null);
                }}
              /> Take Quiz Mode
            </label>
          </div>
          <QuizDisplay
            data={data}
            hideAnswers={hideAnswers}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
          {hideAnswers && (
            <button
              disabled={Object.keys(userAnswers).length !== data.quiz.length}
              className="bg-green-600 text-white mt-2 px-3 py-1 rounded"
              onClick={handleQuizSubmit}
            >
              Submit Answers
            </button>
          )}
          {score && <div className="text-lg font-bold mt-2">Your Score: {score}</div>}
        </div>
      }
    </div>
  );
}
