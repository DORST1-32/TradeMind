import { useState, useEffect } from "react";

function App() {
  const [emotion, setEmotion] = useState("");
  const [position, setPosition] = useState("");
  const [size, setSize] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const [trades, setTrades] = useState([]);
  const [motivation, setMotivation] = useState("");

  const messages = [
    "Keep calm and trade on!",
    "Confidence is key!",
    "Small steps lead to big gains!",
    "Mistakes are lessons, not failures!",
    "Stay focused and stay patient!",
    "Every trade is a learning opportunity!",
    "You're doing great! 💪",
  ];

  useEffect(() => {
    const savedTrades = localStorage.getItem("trades");
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trades", JSON.stringify(trades));
  }, [trades]);

  const saveTrade = () => {
    const newTrade = { emotion, position, size, time, result };
    setTrades([...trades, newTrade]);

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMotivation(randomMsg);

    setEmotion("");
    setPosition("");
    setSize("");
    setTime("");
    setResult("");
  };

  const deleteTrade = (indexToDelete) => {
    setTrades(trades.filter((_, index) => index !== indexToDelete));
  };

  const getEmotionStats = () => {
    const stats = {};
    trades.forEach((trade) => {
      const e = trade.emotion;
      if (!stats[e]) stats[e] = { total: 0, win: 0 };
      stats[e].total++;
      if (trade.result === "win") stats[e].win++;
    });
    return stats;
  };

  // ✅ 모든 입력값 체크
  const isFormValid =
    emotion.trim() !== "" &&
    position.trim() !== "" &&
    size.trim() !== "" &&
    time.trim() !== "" &&
    result.trim() !== "";

  return (
    <div style={{ display: "flex", height: "100vh", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      {/* 왼쪽 1/3: Trade Entry + Emotion Stats */}
      <div style={{ flex: "0 0 33%", padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        <h1>TradeMind</h1>
        <div>
          <h2>Trade Entry</h2>
          <div style={{ marginBottom: 10 }}>
            <p>Emotion</p>
            <select value={emotion} onChange={(e) => setEmotion(e.target.value)} style={inputStyle}>
              <option value="">Select Emotion</option>
              <option value="Calm">Calm</option>
              <option value="Confident">Confident</option>
              <option value="Neutral">Neutral</option>
              <option value="Anxious">Anxious</option>
              <option value="Sad">Sad</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <p>Position</p>
            <select value={position} onChange={(e) => setPosition(e.target.value)} style={inputStyle}>
              <option value="">Select</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <p>Position Size (%)</p>
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <p>Session</p>
            <select value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle}>
              <option value="">Select Session</option>
              <option value="NY">New York</option>
              <option value="ASIA">Asia</option>
              <option value="EU">Europe</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <p>Result</p>
            <select value={result} onChange={(e) => setResult(e.target.value)} style={inputStyle}>
              <option value="">Select Result</option>
              <option value="win" style={{ color: "green" }}>Win</option>
              <option value="loss" style={{ color: "red" }}>Loss</option>
            </select>
          </div>

          {/* ✅ 입력 안되면 버튼 비활성화 */}
          <button onClick={saveTrade} style={buttonStyle} disabled={!isFormValid}>
            Save Trade
          </button>
        </div>

        {/* Emotion Stats */}
        <div>
          <h2>Emotion Stats</h2>
          {trades.length > 0 &&
            Object.entries(getEmotionStats()).map(([e, data]) => {
              const winrate = ((data.win / data.total) * 100).toFixed(0);
              return <div key={e}>{e}: {winrate}% win rate ({data.total} trades)</div>;
            })}
        </div>
      </div>

      {/* 가운데 Motivation */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "15%", fontSize: 24, lineHeight: "1.6em", textAlign: "center" }}>
        {motivation || "Your motivation will appear here after saving a trade!"}
      </div>

      {/* 오른쪽 Trade History */}
      <div style={{ flex: "0 0 33%", padding: 20, overflowY: "auto" }}>
        <h2>Trade History</h2>
        {trades.map((trade, index) => (
          <div key={index} style={{ border: "1px solid #444", borderRadius: 5, padding: 10, marginBottom: 10 }}>
            <p>Emotion: {trade.emotion}</p>
            <p>Position: {trade.position}</p>
            <p>Size: {trade.size}%</p>
            <p>Session: {trade.time}</p>
            <p>Result: <span style={{ color: trade.result === "win" ? "green" : "red" }}>{trade.result}</span></p>
            <button onClick={() => deleteTrade(index)} style={{ background: "#333", color: "#fff", border: "none", borderRadius: 5, padding: 5, cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 5,
  borderRadius: 5,
  border: "1px solid #444",
  background: "#222",
  color: "#fff",
};

const buttonStyle = {
  padding: 10,
  width: "100%",
  borderRadius: 5,
  border: "none",
  background: "#444",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default App;