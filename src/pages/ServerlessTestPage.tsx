import { useState } from "react";

export default function ServerlessTestPage() {
  const [message, setMessage] = useState("");

  async function testServerless() {
    const res = await fetch("/api/hello");
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div>
      <h1>Serverless Test</h1>
      <button onClick={testServerless}>Call /api/hello</button>
      {message && <p>Response: {message}</p>}
    </div>
  );
}
