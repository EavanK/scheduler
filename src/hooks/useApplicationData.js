import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, { types, initial } from "reducers/application";

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, initial);

	// get data from server api
	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then(all => {
			dispatch({
				type: types.SET_APPLICATION_DATA,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			});
		});
	}, []);

	// connect webSocket
	useEffect(() => {
		const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

		// dispatch interview data from server
		ws.onmessage = event => {
			const data = JSON.parse(event.data);
			data.type === types.SET_INTERVIEW && dispatch(data);
		};
		return () => ws.close();
	}, []);

	// change day state when click day
	function setDay(day) {
		dispatch({ type: types.SET_DAY, day });
	}

	// book/edit appointment
	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			dispatch({ type: types.SET_INTERVIEW, id, interview });
		});
	}

	// cancel appointment
	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(() => {
			dispatch({ type: types.SET_INTERVIEW, id, interview: null });
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}
