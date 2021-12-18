import { setSpots } from "helpers/selectors";

// action types
export const types = {
	SET_DAY: "SET_DAY",
	SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
	SET_INTERVIEW: "SET_INTERVIEW",
};

// initial data
export const initial = {
	day: "Monday",
	days: [],
	appointments: {},
	interviewers: {},
};

export default function reducer(state, action) {
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
