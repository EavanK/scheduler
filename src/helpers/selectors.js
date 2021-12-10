export const getAppointmentsForDay = (state, day) => {
  const {days, appointments} = state;
  let result = [];
  const filteredDay = days.find(filter => filter.name === day);

  if (filteredDay) {
    result = filteredDay.appointments.map(id => appointments[id])
  }
  return result;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  
  const { interviewers } = state;
  const { interviewer } = interview;
  interview.interviewer = interviewers[interviewer]
  return interview;
};