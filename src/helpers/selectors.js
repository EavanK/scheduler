// get Appointments for day
export const getAppointmentsForDay = (state, day) => {
	const { days, appointments } = state;
	let result = [];
	const filteredDay = days.find(filter => filter.name === day);

	if (filteredDay) {
		result = filteredDay.appointments.map(id => appointments[id]);
	}
	// return array of appointments on specific day
	return result;
};

//get Interviewers for day
export const getInterviewersForDay = (state, day) => {
	const { days, interviewers } = state;
	let result = [];
	const filteredDay = days.find(filter => filter.name === day);

	if (filteredDay) {
		result = filteredDay.interviewers.map(id => interviewers[id]);
	}
	// return array of interviewers on specific day
	return result;
};

export const getInterview = (state, interview) => {
	if (!interview) return null;

	const { interviewers } = state;
	const { interviewer } = interview;
	// shouldn't manipulate the original data
	const newInterview = { ...interview };
	newInterview.interviewer = interviewers[interviewer];
	return newInterview;
};

// implement spots remaining after book/cancel appointment
export const setSpots = prev => {
	// make sure do not mutate state
	const newDays = JSON.parse(JSON.stringify(prev.days));
	newDays.map(day => {
		// in order to update the spots for a day
		if (prev.day === day.name) {
			const spots = day.appointments.filter(appId => {
				return prev.appointments[appId].interview === null;
			});
			// set spots with new spots remaining
			day.spots = spots.length;
		}
		return day;
	});
	return newDays;
};
