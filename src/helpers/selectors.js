export default function getAppointmentsForDay(state, day) {
  const {days, appointments} = state;

  let result = [];

  const filteredDay = days.find(filter => filter.name === day);

  if (filteredDay) {
    result = filteredDay.appointments.map(id => appointments[id])
  }
  return result;
};