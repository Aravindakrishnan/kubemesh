import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Load all markdown files dynamically
const markdownFiles = import.meta.glob("/src/docs/*.md", { as: "raw" });

function MarkdownViewer() {
  const { fileName } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    const filePath = `/src/docs/${fileName}.md`;
    
    if (markdownFiles[filePath]) {
      markdownFiles[filePath]().then((text) => setContent(text));
    } else {
      setContent("Markdown file not found.");
    }
  }, [fileName]);

  return (
    <div className="container" id="markdown">
      <button onClick={() => navigate(-1)}>⬅️ Back</button>
      {/* <h1>{fileName.replace("-", " ")}</h1> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownViewer;