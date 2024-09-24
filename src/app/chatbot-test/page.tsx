// src/app/chatbot-test/page.tsx
'use client';

import { useState } from 'react';

const ChatbotTest = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          event: 'Sample Event',
          userAttributes: {
            interest: 'Technology',
            location: 'New York',
          },
        }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      setResponse('There was an error getting the response.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Test the Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </form>

      {response && (
        <div>
          <h2>Chatbot Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatbotTest;
