import axios from "axios";
import { useEffect, useReducer } from "react";
import { setSpots } from "helpers/selectors";

// action types
const types = {
	SET_DAY: "SET_DAY",
	SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
	SET_INTERVIEW: "SET_INTERVIEW",
};

// initial data
const initial = {
	day: "Monday",
	days: [],
	appointments: {},
	interviewers: {},
};

function reducer(state, action) {
	const { day, days, appointments, interviewers, id, interview } = action;
	switch (action.type) {
		case types.SET_DAY:
			return { ...state, day };
		case types.SET_APPLICATION_DATA:
			return { ...state, days, appointments, interviewers };
		case types.SET_INTERVIEW: {
			const appointment = { ...state.appointments[id], interview };
			const appointments = { ...state.appointments, [id]: appointment };
			const days = setSpots(state, appointments);
			return { ...state, appointments, days };
		}
		default:
			throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
	}
}

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
		return axios.put(`/api/appointments/${id}`, { interview });
	}

	// cancel appointment
	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`);
	}

	return { state, setDay, bookInterview, cancelInterview };
}
