import React from "react";
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByTestId,
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
	// test selecting another day (if we are still getting data for the other day)
	it("defaults to Monday and changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText("Monday"));

		fireEvent.click(getByText("Tuesday"));
		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	// test booking a new interveiew appointment
	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment")[0];

		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByTestId(appointment, "student-name-input"), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();
	});
});
