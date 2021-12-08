import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, day, setDay} = props;
  const dayListItem = days.map(id => <DayListItem key={id.id} {...id} selected={id.name === day} setDay={setDay}/>);
  
  return (
    <ul>{dayListItem}</ul>
  );
}