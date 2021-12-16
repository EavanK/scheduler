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
	const { day, days, appointments, interviewers, id, interview } = action.payload;
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

	useEffect(() => {
		// get data from server api
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then(all => {
			dispatch({
				type: types.SET_APPLICATION_DATA,
				payload: {
					days: all[0].data,
					appointments: all[1].data,
					interviewers: all[2].data,
				},
			});
		});
	}, []);

	// WebSocket
	useEffect(() => {
		const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
		// send message to server
		webSocket.onopen = event => webSocket.send("ping");

		// receive message from server
		webSocket.onmessage = event => {
			console.log(event.data);
		};
	}, []);

	// change day state when click day
	function setDay(day) {
		dispatch({ type: types.SET_DAY, payload: { day } });
	}

	// book/edit appointment
	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			dispatch({ type: types.SET_INTERVIEW, payload: { id, interview } });
		});
	}

	// cancel appointment
	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(res => {
			dispatch({ type: types.SET_INTERVIEW, payload: { id, interview: null } });
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}
