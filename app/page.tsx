'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyse() {
    if (!input.trim()) return;
    setLoading(true);
    setResult('⏳ Analyse läuft...');

    try {
      const res = await fetch('http://localhost:3001/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResult(data.output || '⚠️ Keine Antwort erhalten.');
    } catch   {
      setResult('❌ Fehler bei der Analyse. Bitte später erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-black">LEXSCAN.AI</h1>
        <p className="text-center text-gray-700 mb-6 text-lg">
          DSGVO / KI / ESG Analyse in Sekunden – powered by GPT
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Z. B. Datenschutzerklärung, Cookie-Hinweis, Impressum, ESG-Policy…"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black mb-6"
        />
        <div className="flex justify-center">
          <button
            onClick={handleAnalyse}
            className={`px-6 py-2 text-white font-semibold rounded-lg bg-black hover:bg-gray-800 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Analysiere...' : 'Jetzt prüfen'}
          </button>
        </div>
        {result && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap text-sm text-gray-800">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
