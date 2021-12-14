import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "Saving";
const DELETE = "Deleting";
const CONFIRM = "CONFIRM";
const confirmMessage = "Are you sure you would like to delete?";

export default function Appointment(props) {
	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	// create apopintment
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

	// send confirm message for deleting
	function confirm() {
		transition(CONFIRM);
	}

	// delete appointment
	function onDelete() {
		const interview = null;
		transition(DELETE);
		cancelInterview(id, interview).then(() => {
			transition(EMPTY);
		});
	}

	return (
		<article className="appointment">
			<Header time={time} />
			{/* if you click button, add CRATE mode and change mode to CREATE mode */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVE && <Status message={SAVE} />}
			{mode === DELETE && <Status message={DELETE} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => confirm()}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={interviewers} onCancel={() => back()} onSave={save} />
			)}
			{mode === CONFIRM && (
				<Confirm message={confirmMessage} onCancel={() => back()} onConfirm={onDelete} />
			)}
		</article>
	);
}
