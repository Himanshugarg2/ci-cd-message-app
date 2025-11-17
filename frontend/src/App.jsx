import { useState, useEffect } from "react";
import "./App.css"; // import CSS file

export default function App() {
  const API_URL = "http://localhost:8000";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    fetch(`${API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    })
      .then((res) => res.json())
      .then(() => {
        setEmail("");
        setMessage("");
        fetchMessages();
      });
  };

  return (
    <div className="container">
      <h1 className="title">Message App</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <textarea
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="textarea"
        />

        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <h2 className="subtitle">All Messages</h2>

      <ul className="message-list">
        {messages.map((msg, i) => (
          <li key={i} className="message-card">
            <strong>{msg.email}</strong>
            <p>{msg.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
