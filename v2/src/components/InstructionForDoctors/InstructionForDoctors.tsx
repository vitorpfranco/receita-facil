import React, { useState, useMemo, useCallback } from "react";
import style from "./style.module.scss";
import CloseIcon from "@mui/icons-material/Close";

type InstructionForDoctorsProps = {
  instruction: string;
  drugUuid: string;
};

const InstructionForDoctors: React.FC<InstructionForDoctorsProps> = ({
  instruction,
}) => {
  const [showInstruction, setShowInstruction] = useState(true);

  const parseInstructions = (instructionText: string) => {
    const regex = /!\[(image|link):([^\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(instructionText)) !== null) {
      if (match.index > lastIndex) {
        const textBeforeContent = instructionText
          .slice(lastIndex, match.index)
          .trim();
        if (textBeforeContent) {
          parts.push({ type: "text", content: textBeforeContent });
        }
      }
      const partType = match[1];
      const instruction = match[2];

      parts.push({ type: partType, src: instruction });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < instructionText.length) {
      const remainingText = instructionText.slice(lastIndex).trim();
      if (remainingText) {
        parts.push({ type: "text", content: remainingText });
      }
    }

    return parts;
  };

  const createElementForPart = useCallback(
    (part: { type: string; content?: string; src?: string }) => {
      switch (part.type) {
        case "image":
          return createImageElement(part.src || "");
        case "link":
          return createLinkElement(part.src || "");
        default:
          return createTextElement(part.content || "");
      }
    },
    []
  );

  const createImageElement = (src: string) => {
    return (
      <img
        src={src}
        style={{ maxWidth: "80%", height: "auto" }}
        alt="Instruction"
        className={style.instructionImage}
      />
    );
  };

  const createLinkElement = (src: string) => {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        {src}
      </a>
    );
  };

  const createTextElement = (content: string) => {
    return <p>{content}</p>;
  };

  const renderedInstructions = useMemo(() => {
    const parts = parseInstructions(instruction);
    return parts.map((part, index) => (
      <React.Fragment key={index}>{createElementForPart(part)}</React.Fragment>
    ));
  }, [instruction, createElementForPart]);

  if (!showInstruction) {
    return <></>;
  }

  return (
    <div className={`${style.instructionForDoctors} hideOnPrint`}>
      <div className={style.instructionContent}>
        <div className={style.instructionBody}>{renderedInstructions}</div>
      </div>
      <CloseIcon
        onClick={() => {
          setShowInstruction(false);
        }}
        className={style.instructionButton}
      />
    </div>
  );
};

export default InstructionForDoctors;
