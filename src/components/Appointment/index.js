import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const allMode = {
	EMPTY: "EMPTY",
	SHOW: "SHOW",
	CREATE: "CREATE",
	SAVE: "Saving",
	DELETE: "Deleting",
	CONFIRM: "CONFIRM",
	EDIT: "EDIT",
	ERROR_SAVE: "ERROR_SAVE",
	ERROR_DELETE: "ERROR_DELETE",
};
const { EMPTY, SHOW, CREATE, SAVE, DELETE, CONFIRM, EDIT, ERROR_SAVE, ERROR_DELETE } =
	allMode;

const messages = {
	saveErrorMessage: "Could not save appointment",
	deleteErrorMessage: "Could not delete appointment",
	confirmMessage: "Are you sure you would like to delete?",
};
const { saveErrorMessage, deleteErrorMessage, confirmMessage } = messages;

export default function Appointment(props) {
	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	// fix stale state bug (for webSocket)
	useEffect(() => {
		interview && mode === EMPTY && transition(SHOW);
		interview === null && mode === SHOW && transition(EMPTY);
	}, [interview, transition, mode]);

	// create apopintment
	function save(name, interviewer) {
		const interview = { student: name, interviewer };
		transition(SAVE);
		bookInterview(id, interview)
			.then(() => transition(SHOW))
			.catch(err => transition(ERROR_SAVE, true));
	}

	// delete appointment
	function onDelete() {
		transition(DELETE, true);
		cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch(err => transition(ERROR_DELETE, true));
	}

	return (
		<article className="appointment">
			<Header time={time} />
			{/* if you click button, add CRATE mode and change mode to CREATE mode */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVE && <Status message={SAVE} />}
			{mode === DELETE && <Status message={DELETE} />}
			{mode === SHOW && interview && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => transition(CONFIRM)}
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={interviewers} onCancel={() => back()} onSave={save} />
			)}
			{mode === EDIT && (
				<Form
					interviewers={interviewers}
					onCancel={() => back()}
					onSave={save}
					student={interview.student}
					interviewer={interview.interviewer.id}
				/>
			)}
			{mode === CONFIRM && (
				<Confirm message={confirmMessage} onCancel={() => back()} onConfirm={onDelete} />
			)}
			{mode === ERROR_SAVE && <Error onClose={() => back()} message={saveErrorMessage} />}
			{mode === ERROR_DELETE && (
				<Error onClose={() => back()} message={deleteErrorMessage} />
			)}
		</article>
	);
}
