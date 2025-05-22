import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError("");
    setChatResponse("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/ask-ai?prompt=${encodeURIComponent(prompt)}`
      );
      if (!response.ok) {
        const errorText =
          (await response.text()) || `HTTP error! status: ${response.status}`;
        throw new Error(errorText);
      }
      const data = await response.text();
      setChatResponse(data);
    } catch (err) {
      console.error("Error generating chat response:", err);
      setError(err.message || "Failed to get response from AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    if (error && e.target.value.trim()) setError("");
  };

  return (
    <div className="component-card">
      <h2>Ask Our AI Anything</h2>
      <div className="form-group chat-input-group">
        {" "}
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your prompt here..."
          disabled={isLoading}
          rows={3}
        />
        <button
          onClick={askAI}
          disabled={isLoading || !prompt.trim()}
          className="action-button"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
      {isLoading && (
        <p className="loading-text">AI is processing your request...</p>
      )}
      {error && <p className="error-message">{error}</p>}

      {chatResponse && (
        <div className="output-section">
          <h3>AI Response:</h3>
          <pre>{chatResponse}</pre>
        </div>
      )}
    </div>
  );
}
export default ChatComponent;
