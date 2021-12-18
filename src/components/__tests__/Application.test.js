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
	queryByText,
} from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
	// test selecting another day (if we are still getting data for the other day)
	it("defaults to Monday and changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText("Monday"));

		fireEvent.click(getByText("Tuesday"));
		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	// test booking a new interveiew appointment and remaining spots updating after booking
	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(appointment =>
			getByAltText(appointment, "Add"),
		);

		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByTestId(appointment, "student-name-input"), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	// test deleting appointment and remaining spots updating after deleting
	it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(appointment =>
			queryByText(appointment, "Archie Cohen"),
		);

		fireEvent.click(getByAltText(appointment, "Delete"));
		expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() => getByAltText(appointment, "Add"));

		const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	// test editing appointment and remaining spots is still the same
	it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(appointment =>
			queryByText(appointment, "Archie Cohen"),
		);

		fireEvent.click(getByAltText(appointment, "Edit"));
		fireEvent.change(getByTestId(appointment, "student-name-input"), {
			target: { value: "Eavan Kim" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Eavan Kim"));

		const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	// error handling test (saving)
	it("shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();

		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(appointment =>
			getByAltText(appointment, "Add"),
		);

		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByTestId(appointment, "student-name-input"), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Could not save appointment"));

		fireEvent.click(getByAltText(appointment, "Close"));

		expect(getByText(appointment, "Save")).toBeInTheDocument();

		const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	// error handling test (canceling)
	it("shows the delete error when failing to delete an existing appointment", async () => {
		axios.delete.mockRejectedValueOnce();

		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment").find(appointment =>
			queryByText(appointment, "Archie Cohen"),
		);

		fireEvent.click(getByAltText(appointment, "Delete"));
		expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Could not delete appointment"));

		fireEvent.click(getByAltText(appointment, "Close"));
		expect(getByAltText(appointment, "Delete")).toBeInTheDocument();

		const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});
});
