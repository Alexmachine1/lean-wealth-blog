"use client";

import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function MarkdownEditor(props: MDEditorProps) {
  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor
        visibleDragbar={false}
        {...props}
      />
    </div>
  );
}
