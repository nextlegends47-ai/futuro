"use client";

import { useState } from "react";
import { guide } from "@/data/catalog";
import { Title } from "../Title";

/** Ratgeber. Am Handy ist der Text eingeklappt, der Knopf heißt „Weiterlesen“. */
export function Guide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="guide" data-open={open}>
      <Title id="guide-title">{guide.title}</Title>
      <div className="guide__text" id="guide-text" data-reveal>
        {guide.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <button type="button" className="btn btn--soft btn--sm guide__more" aria-controls="guide-text" aria-expanded={open} onClick={() => setOpen(true)}>
        Weiterlesen
      </button>
    </div>
  );
}
