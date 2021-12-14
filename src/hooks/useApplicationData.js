import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData() {
	// combine states into one state(day, days, appointments)
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	// Get data from api server then setState
	useEffect(() => {
		const getDays = axios.get("/api/days");
		const getAppointments = axios.get("/api/appointments");
		const getInterviewers = axios.get("/api/interviewers");
		// get data at the same time (promise all)
		Promise.all([getDays, getAppointments, getInterviewers]).then(all => {
			setState(prev => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	// change day state when click day
	const setDay = day => setState({ ...state, day });

	// create appointment
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		const url = `/api/appointments/${id}`;
		return axios.put(url, { interview }).then(res => {
			setState({ ...state, appointments });
		});
	}

	// delete appointment
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		const url = `/api/appointments/${id}`;
		return axios.delete(url, { interview: null }).then(res => {
			setState({ ...state, appointments });
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}
