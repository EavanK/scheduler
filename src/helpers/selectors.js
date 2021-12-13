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
