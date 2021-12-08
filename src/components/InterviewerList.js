import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  const interviewListItem = interviewers.map(person => 
  <InterviewerListItem key={person.id} {...person} selected={interviewer === person.id} setInterviewer={setInterviewer} />
  );

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewListItem}</ul>
    </section>
  );
}