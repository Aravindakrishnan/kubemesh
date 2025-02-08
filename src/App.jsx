import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MarkdownViewer from "./MarkdownViewer";
import { useEffect, useState } from "react";

// Load all markdown files dynamically
const markdownFiles = import.meta.glob("/src/docs/*.md", { as: "raw" });

function Home() {
  return (
    <div className="mk__container">
      <h2 className="container__title">Topics ☕</h2>
      <ul className="container__list">
        {Object.keys(markdownFiles).map((file) => {
          const fileName = file.split("/").pop().replace(".md", "");
          return (
            <li className="container__chip" key={fileName}>
              <Link className="container__link" to={`/docs/${fileName}`}>
              <div className="card">
                <div className="card__content">
                  <h3 className="card__title">{fileName.replace("-", " ")}</h3>
                </div>
              </div>
              </Link>
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