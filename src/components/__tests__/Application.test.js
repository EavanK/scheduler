import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";
import axios from "../../__mocks__/axios";

afterEach(cleanup);

it("renders without crashing", () => {
	render(<Application />);
});
