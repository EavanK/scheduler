/* eslint-disable no-undef */

describe("Appointments", () => {
	//before each test runs, reset database, visit root page, click "Tuesday"
	beforeEach(() => {
		cy.request("GET", "/api/debug/reset");
		cy.visit("/");

		cy.contains("[data-testid='day']", "Monday")
			.click()
			.should("have.class", "day-list__item--selected");
	});

	// test booking an interview
	it("should book an interview", () => {
		cy.get("[alt=Add]").first().click();

		cy.get("[data-testid=student-name-input]")
			.type(
				"Lydis{backspace}a m{backspace}MillerJ{backspace}-jon{backspace}{backspace}{backspace}Jones",
				{ delay: 80 },
			)
			.should("have.value", "Lydia Miller-Jones");
		cy.get("[alt='Sylvia Palmer']").click();

		cy.contains("Save").click();

		cy.contains(".appointment__card--show", "Lydia Miller-Jones");
		cy.contains(".appointment__card--show", "Sylvia Palmer");
	});

	// test editing an interview already exists
	it("should edit an interview", () => {
		cy.get("[alt='Edit']").click({ force: true });

		cy.get("[data-testid=student-name-input]")
			.clear()
			.type("hy{backspace}{backspace}Hyunsu {selectall}Eavan Kim", { delay: 80 })
			.should("have.value", "Eavan Kim");

		cy.get("[alt='Tori Malcolm']").click();

		cy.contains("Save").click();
		cy.contains(".appointment__card--show", "Eavan Kim");
		cy.contains(".appointment__card--show", "Tori Malcolm");
	});

	// test canceling an interview
	it("shoud cancel an interview", () => {
		cy.get("[alt='Delete']").click({ force: true });

		cy.contains("Confirm").click();

		cy.contains("Deleting").should("exist");
		cy.contains("Deleting").should("not.exist");

		cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
	});
});
