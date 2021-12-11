import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // combine states into one state(day, days, appointments)
  const [state, setState] = useState({ 
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // change day state when click day
  const setDay = day => setState({...state, day});

  // Get data from api server
  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviewers = axios.get("/api/interviewers");
    // get data at the same time (promise all)
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      });
  }, []);

  // array of interviewers on specific day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  // use helper function to transform data that needs to pass down to Appointment component (getAppointmentsForDay)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentListItem = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentListItem}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
