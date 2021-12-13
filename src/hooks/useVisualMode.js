import { useState } from "react";

export default function useVisualMode(initial) {
	const [history, setHistory] = useState([initial]);

	const transition = (mode, replace = false) => {
		// if replace is true,
		if (replace) return setHistory(prev => [mode, ...prev.slice(1)]);
		// replace is false,
		return setHistory(prev => [mode, ...prev]);
	};

	const back = () => {
		// if history has only one element,
		if (history.length === 1) return;

		return setHistory(prev => [...prev.slice(1)]);
	};
	const mode = history[0];
	return { mode, transition, back };
}
