import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
	const interviewers = [
		{
			id: 1,
			name: "Sylvia Palmer",
			avatar: "https://i.imgur.com/LpaY82x.png",
		},
	];

	it("renders without student name if not provided", () => {
		const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
		expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
	});

	it("renders with initial student name", () => {
		const { getByTestId } = render(
			<Form interviewers={interviewers} student="Lydia Miller-Jones" />,
		);
		expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
	});

	// test error handling  (when empty student name passed)
	it("validates that the student name is not blank", () => {
		const onSave = jest.fn();
		const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />);

		fireEvent.click(getByText("Save"));

		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();
	});

	// test error handling  (when the interviewer hasn't selected)
	it("validates that the interviewer is selected", () => {
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText } = render(
			<Form interviewers={interviewers} onSave={onSave} />,
		);

		fireEvent.change(getByPlaceholderText("Enter Student Name"), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByText("Save"));

		expect(getByText(/Please select an interviewer/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();
	});

	// test error handling + saving after errors solved
	it("can successfully save after trying to submit an empty student name and unselected interviewer", () => {
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText, queryByText, getByAltText, debug } = render(
			<Form interviewers={interviewers} onSave={onSave} />,
		);

		fireEvent.click(getByText("Save"));

		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();

		fireEvent.change(getByPlaceholderText("Enter Student Name"), {
			target: { value: "Lydia Miller-Jones" },
		});

		fireEvent.click(getByText("Save"));

		expect(getByText(/Please select an interviewer/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();

		fireEvent.click(getByAltText("Sylvia Palmer"));
		fireEvent.click(getByText("Save"));

		expect(queryByText(/student name cannot be blank/i)).toBeNull();
		expect(queryByText(/Please select an interviewer/i)).toBeNull();

		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
	});

	// test onCancel function
	it("calls onCancel and resets the input field", () => {
		const onCancel = jest.fn();
		const { getByText, getByPlaceholderText, queryByText } = render(
			<Form
				interviewers={interviewers}
				student="Lydia Miller-Jones"
				onSave={jest.fn()}
				onCancel={onCancel}
			/>,
		);

		fireEvent.click(getByText("Save"));
		fireEvent.change(getByPlaceholderText("Enter Student Name"), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByText("Cancel"));

		expect(queryByText(/student name cannot be blank/i)).toBeNull();
		expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
		expect(onCancel).toHaveBeenCalledTimes(1);
	});
});
