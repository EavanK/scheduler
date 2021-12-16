// get Appointments for day
export const getAppointmentsForDay = (state, day) => {
	const { days, appointments } = state;
	const filteredDay = days.find(dayId => dayId.name === day);
	if (filteredDay) return filteredDay.appointments.map(id => appointments[id]);
	// return array of appointments on specific day
	return [];
};

//get Interviewers for day
export const getInterviewersForDay = (state, day) => {
	const { days, interviewers } = state;
	const filteredDay = days.find(dayId => dayId.name === day);
	if (filteredDay) return filteredDay.interviewers.map(id => interviewers[id]);
	// return array of interviewers on specific day
	return [];
};

export const getInterview = (state, interview) => {
	if (!interview) return null;
	return { ...interview, interviewer: state.interviewers[interview.interviewer] };
};

// implement spots remaining after book/cancel appointment
export const setSpots = (state, appointments) => {
	// make sure do not mutate original state
	// in order to update the spots on a specific day
	// get number of spots available on the specific day
	// set spots with new spots remaining
	const theDay = state.days.find(day => state.day === day.name);
	const spots = theDay.appointments.filter(appId => {
		return appointments[appId].interview === null;
	}).length;
	const days = state.days.map(day => {
		if (day.name === theDay.name) return { ...day, spots };
		return day;
	});
	return days;
};
