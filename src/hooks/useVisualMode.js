import { useState } from "react";

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);
  
  const transition = (mode, replace = false) => {
    const newHistory = [...history];
    // if replace is true, 
    if (replace) newHistory.pop();

    setMode(mode);
    setHistory([...newHistory, mode]);
  };

  const back = () => {
    // if history has only one element,
    if (history.length === 1) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
};