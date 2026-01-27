"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchChance?: number; // 0 a 1, chance de um caractere fazer glitch
  glitchSymbols?: string; // Caracteres para o glitch
  glitchDuration?: number; // Duração do glitch em ms
  glitchInterval?: number; // Intervalo entre os glitches em ms
  gradientClassName?: string; // Classe para aplicar o gradiente ao glitch
  isStatic?: boolean; // Se for true, não faz glitch, apenas mostra o outline/gradiente
}

const defaultGlitchSymbols = "01#$%=+-_*/<>()[]{}&^@!?~";
const defaultNumbers = "0123456789";

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  glitchChance = 0.08, // 8% de chance por caractere
  glitchSymbols = defaultGlitchSymbols + defaultNumbers,
  glitchDuration = 100, // Cada glitch dura 100ms
  glitchInterval = 2000, // Novos glitches a cada 2 segundos
  gradientClassName,
  isStatic = false, // Por padrão, o glitch é animado
}) => {
  const [glitchedText, setGlitchedText] = useState<string[]>([]);
  const [isGlitched, setIsGlitched] = useState<boolean[]>(
    new Array(text.length).fill(false),
  );

  // Função para gerar um caractere aleatório
  const getRandomChar = (type: "symbol" | "number" | "mix") => {
    let chars = "";
    if (type === "symbol") chars = defaultGlitchSymbols;
    else if (type === "number") chars = defaultNumbers;
    else chars = glitchSymbols;
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  useEffect(() => {
    if (isStatic) {
      setGlitchedText(text.split(""));
      return;
    }

    const intervalId = setInterval(() => {
      const newGlitchedText = text.split("").map((char, index) => {
        if (char === " ") return " "; // Não faz glitch no espaço

        if (Math.random() < glitchChance && !isGlitched[index]) {
          // Determina se vai ser um símbolo ou número baseado na posição ou aleatoriamente
          const charType = Math.random() > 0.5 ? "symbol" : "number";
          return getRandomChar(charType);
        }
        return char;
      });

      setGlitchedText(newGlitchedText);

      const newIsGlitched = new Array(text.length).fill(false);
      newGlitchedText.forEach((char, index) => {
        if (char !== " " && char !== text[index]) {
          newIsGlitched[index] = true;
        }
      });
      setIsGlitched(newIsGlitched);

      // Resetar os caracteres glitched para o original após um tempo
      setTimeout(() => {
        setGlitchedText(text.split(""));
        setIsGlitched(new Array(text.length).fill(false));
      }, glitchDuration);
    }, glitchInterval);

    return () => clearInterval(intervalId);
  }, [
    text,
    glitchChance,
    glitchSymbols,
    glitchDuration,
    glitchInterval,
    isStatic,
    isGlitched,
  ]);

  return (
    <motion.span className={`relative inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${isGlitched[index] ? "glitch-active " + gradientClassName : ""}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: isGlitched[index] ? [0, 1, 0, 1] : 1 }} // Anima a opacidade do glitch
          transition={{
            duration: glitchDuration / 1000,
            times: [0, 0.2, 0.8, 1],
          }}
          style={{
            // Para posicionar os caracteres glitched exatamente em cima do texto original
            position: "relative",
            display: "inline-block",
            zIndex: isGlitched[index] ? 20 : 10,
            textShadow: isGlitched[index]
              ? "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(239, 68, 68, 0.5)"
              : "none",
          }}
        >
          {glitchedText[index]}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default GlitchText;
