import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
	const { interviewers, onChange, value } = props;
	const interviewListItem = interviewers.map(interviewer => {
		const { id, name, avatar } = interviewer;
		return (
			<InterviewerListItem
				key={id}
				name={name}
				avatar={avatar}
				selected={id === value}
				setInterviewer={() => onChange(id)}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewListItem}</ul>
		</section>
	);
}

// prop-types test
InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};
