import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      setResult(data);

    } catch (err) {
      setResult("Error occurred");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI Resume Analyzer</h1>

      <div className="file-upload">
  <label className="custom-file">
    Choose Resume
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
    />
  </label>

  {file && <p className="file-name">{file.name}</p>}
</div>

        <button onClick={upload}>Analyze Resume</button>

        {result && (
          <div className="result-box">
            <h3>Analysis Result</h3>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;