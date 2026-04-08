import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        const nextIndex = charIndex + 1;
        setDisplayed(current.slice(0, nextIndex));
        setCharIndex(nextIndex);
      }, speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        const nextIndex = charIndex - 1;
        setDisplayed(current.slice(0, nextIndex));
        setCharIndex(nextIndex);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex(w => (w + 1) % words.length);
      setCharIndex(0);
      setDisplayed("");
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}
