import React from 'react';

export default function HistoryTable({ data, onDetails }) {
  return (
    <table className="min-w-full table-auto border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Title</th>
          <th className="border px-2">URL</th>
          <th className="border px-2">Date</th>
          <th className="border px-2">Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((q) => (
          <tr key={q.id}>
            <td className="border px-2">{q.id}</td>
            <td className="border px-2">{q.title}</td>
            <td className="border px-2 max-w-sm truncate">{q.url}</td>
            <td className="border px-2">{new Date(q.date_generated).toLocaleString()}</td>
            <td className="border px-2">
              <button className="text-blue-600 underline" onClick={() => onDetails(q.id)}>
                Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
