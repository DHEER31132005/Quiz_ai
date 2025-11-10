import React from 'react';

const QuizDisplay = ({ data, hideAnswers, userAnswers, setUserAnswers }) => {
  if (!data) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <p className="text-gray-700">{data.summary}</p>
      <div>
        <h3 className="font-semibold">Quiz</h3>
        <ol className="list-decimal pl-4">
          {data.quiz.map((q, idx) => (
            <li key={idx} className="mb-3">
              <div>{q.question} <span className="text-xs">[{q.difficulty}]</span></div>
              <ul className="pl-4">
                {q.options.map((opt, oidx) => (
                  <li key={oidx}>
                    {hideAnswers && setUserAnswers ? (
                      <label>
                        <input
                          type="radio"
                          name={`q${idx}`}
                          value={opt}
                          checked={userAnswers[idx] === opt}
                          onChange={() => setUserAnswers({ ...userAnswers, [idx]: opt })}
                        /> {String.fromCharCode(65 + oidx)}. {opt}
                      </label>
                    ) : (
                      <>
                        <span
                          className={opt === q.answer ? 'text-green-600 font-semibold' : ''}
                        >{String.fromCharCode(65 + oidx)}. {opt}</span>
                        {opt === q.answer && !hideAnswers && (
                            <span className="ml-2">✅</span>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {!hideAnswers && <div className="text-sm text-gray-600 mt-1">Explanation: {q.explanation}</div>}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <div className="font-semibold">Key Entities</div>
        <ul className="pl-4">
          {Object.entries(data.key_entities).map(([k, v], i) =>
            <li key={i}><span className="capitalize">{k}</span>: {v.join(', ')}</li>
          )}
        </ul>
      </div>
      <div>
        <span className="font-semibold">Sections:</span> {data.sections.join(', ')}
      </div>
      <div>
        <span className="font-semibold">Related Topics:</span> {data.related_topics.join(', ')}
      </div>
    </div>
  );
};

export default QuizDisplay;
