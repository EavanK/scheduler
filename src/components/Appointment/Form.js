import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
	const { interviewers, onSave, onCancel } = props;
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	// reset input value (student name), interviewer
	const reset = () => {
		setStudent("");
		setInterviewer("");
	};
	// call reset and onCancel functions
	const cancel = () => {
		reset();
		onCancel();
	};
	// pass 2 arguments (student, interviewer) to parent component (Appointment)
	const validate = () => {
		return student === ""
			? setError("Student name cannot be blank")
			: onSave(student, interviewer);
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						value={student}
						onChange={event => setStudent(event.target.value)}
						data-testid="student-name-input"
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
