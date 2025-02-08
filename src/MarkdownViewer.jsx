import "./markdown.css";
import "github-markdown-css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

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
    <div className="mk__container">
            <div className="container markdown-container" id="markdown">
      <button className="back__btn" onClick={() => navigate(-1)}>⬅️ Back</button>
      {/* <h1>{fileName.replace("-", " ")}</h1> */}
            <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
                <SyntaxHighlighter style={docco} language={match[1]} PreTag="div">
                {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
            ) : (
                <code {...props} className={className}>
                {children}
                </code>
            );
            },
        }}
        >
        {content}
        </ReactMarkdown>
    </div>
    </div>
  );
}

export default MarkdownViewer;