import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MarkdownViewer from "./MarkdownViewer";
import { useEffect, useState } from "react";

// Load all markdown files dynamically
const markdownFiles = import.meta.glob("/src/docs/*.md", { as: "raw" });

function Home() {
  return (
    <div className="container">
      <h3 className="container__title">Topics ☕</h3>
      <ul className="container__list">
        {Object.keys(markdownFiles).map((file) => {
          const fileName = file.split("/").pop().replace(".md", "");
          return (
            <li className="container__chip" key={fileName}>
              <Link to={`/docs/${fileName}`}>{fileName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:fileName" element={<MarkdownViewer />} />
      </Routes>
    </Router>
  );
}

export default App;