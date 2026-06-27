"use client";

import Giscus from "@giscus/react";
import { useTheme } from "./ThemeProvider";

export default function CommentSection() {
  const { theme } = useTheme();

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-foreground">Comments</h2>
      <div className="mt-4">
        <Giscus
          id="comments"
          repo="your-username/lean-wealth-blog"
          repoId="YOUR_REPO_ID"
          category="Announcements"
          categoryId="YOUR_CATEGORY_ID"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === "dark" ? "dark" : "light"}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}
