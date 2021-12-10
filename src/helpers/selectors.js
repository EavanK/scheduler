export default function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(id => id.name === day);
  if (filteredDay[0]) {
    filteredDay[0].appointments.map(id => {
      result.push(state.appointments[`${id}`])
    });
  }
  return result;
};