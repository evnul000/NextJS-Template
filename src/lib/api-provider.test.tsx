/**
 * Unit Tests — ApiProvider + useAPI hook
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ApiProvider, useAPI } from "./api-provider";

// Test component that calls useAPI()
function TestConsumer() {
  const api = useAPI();
  return <div data-testid="ok">{typeof api.accounts.getAll}</div>;
}

describe("ApiProvider", () => {
  it("provides the API client to children via useAPI()", () => {
    render(
      <ApiProvider baseUrl="">
        <TestConsumer />
      </ApiProvider>
    );
    expect(screen.getByTestId("ok").textContent).toBe("function");
  });
});

describe("useAPI outside provider", () => {
  it("throws a descriptive error", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      /useAPI\(\) must be used inside <ApiProvider>/
    );
    spy.mockRestore();
  });
});
