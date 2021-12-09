import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time } = props;
  const formatTime = time => time ? `Appointment at ${time}` : `No Appointment`;

  return (  
    <article className="appointment">{formatTime(time)}</article>
  );
}