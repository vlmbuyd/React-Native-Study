/**
 * @format
 */

import React from "react";
import ReactTestRenderer from "react-test-renderer";
import App from "../Matzip/App";

test("renders correctly", async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
