import React, { useState, useEffect } from 'react';

const API = 'http://localhost:8000';

function App() {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API}/quiz`)
      .then(r => r.json())
      .then(data => setQuiz(data));
  }, []);

  const submit = async () => {
    const res = await fetch(`${API}/quiz/answer`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ answer: selected })
    });
    setResult(await res.json());
  };

  if (!quiz) return <div>Loading quiz ...</div>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', border: '1px solid #ddd', padding: 24, borderRadius: 8 }}>
      <h2>Quiz</h2>
      <div><strong>{quiz.question}</strong></div>
      <ul style={{ listStyle: 'none', margin: '18px 0', padding: 0 }}>
        {quiz.options.map(opt => (
          <li key={opt}>
            <label>
              <input
                type="radio"
                value={opt[0]}
                checked={selected === opt[0]}
                onChange={e => { setSelected(e.target.value); setResult(null); }}
                style={{ marginRight: 8 }}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={submit}
        disabled={!selected}
        style={{ background: '#2563eb', color: 'white', padding: "6px 18px", border: 0, borderRadius: 4 }}
      >
        Submit
      </button>
      {result &&
        <div style={{ marginTop: 24, fontWeight: 'bold', color: result.correct ? 'green' : 'red' }}>
          {result.message}
        </div>
      }
    </div>
  );
}

export default App;
