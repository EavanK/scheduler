import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, value, onChange} = props;
  const dayListItem = days.map(day => {
    const {id, name, spots} = day;
    return (
      <DayListItem 
      key={id} 
      name={name}
      spots={spots}
      selected={name === value} 
      setDay={onChange}
      />
    );
  });
  
  return (
    <ul>{dayListItem}</ul>
  );
}