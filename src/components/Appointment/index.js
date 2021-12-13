import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVING";

export default function Appointment(props) {
	const { id, time, interview, interviewers, bookInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVE);
		bookInterview(id, interview).then(() => {
			transition(SHOW);
		});
	}

	return (
		<article className="appointment">
			<Header time={time} />
			{/* if you click button, add CRATE mode and change mode to CREATE mode */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVE && <Status message={SAVE} />}
			{mode === SHOW && (
				<Show student={interview.student} interviewer={interview.interviewer} />
			)}
			{mode === CREATE && (
				<Form interviewers={interviewers} onCancel={() => back()} onSave={save} />
			)}
		</article>
	);
}
