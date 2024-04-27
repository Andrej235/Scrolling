import { useEffect, useState } from "react";

interface TypingTextProps {
  staticText?: string;
  typingText?: string;
  skipWhitespace?: boolean;
  className?: string;
  id?: string;
}

export default function TypingText({
  staticText,
  typingText,
  skipWhitespace,
  className,
  id,
}: TypingTextProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!typingText) return;

    setText("");
    let interval = startTyping();
    return () => clearInterval(interval);
  }, [typingText]);

  function startTyping() {
    if (!typingText) return;

    let curr: number = 0;
    const interval = setInterval(() => {
      if (skipWhitespace && !/\S/.test(typingText.charAt(curr))) curr++;
      setText(typingText.substring(0, curr++));

      if (curr > typingText.length) {
        setTimeout(startErasing, 1000);
        clearInterval(interval);
      }
    }, 200);

    return interval;
  }

  function startErasing() {
    if (!typingText) return;

    let curr: number = typingText.length - 1;
    const interval = setInterval(() => {
      if (skipWhitespace && !/\S/.test(typingText.charAt(curr))) curr--;
      setText(typingText.substring(0, curr--));

      if (curr < 0) {
        setTimeout(startTyping, 100);
        clearInterval(interval);
      }
    }, 100);

    return interval;
  }

  return (
    <p
      className={"typing-text-container" + (className ? " " + className : "")}
      id={id}
    >
      <span className="static">{staticText}</span>{" "}
      <span className="typing">{text}</span>
    </p>
  );
}
