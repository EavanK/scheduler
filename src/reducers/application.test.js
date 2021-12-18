import reducer from "./application";

// test for reducer function
describe("Application Reducer", () => {
	// error handling test (unsupported action type)
	it("throws an error with an unsupported type", () => {
		expect(() => reducer({}, { type: null })).toThrowError(
			/tried to reduce with unsupported action type/i,
		);
	});
});
