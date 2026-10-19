import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";
import data from "./data.json";

it("renders the main sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: data.name })).toBeTruthy();
  for (const name of ["Experience", "Publications", "Skills", "Projects", "Get in touch"]) {
    expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
  }
  expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
});

it("does not publish a phone number or placeholder text", () => {
  const text = JSON.stringify(data);
  expect(text).not.toMatch(/555-555|Your Street|Lorem|Nordic Giant/i);
  expect("phone" in data).toBe(false);
});

it("lists publications and an ended IT role", () => {
  expect(data.publications.length).toBeGreaterThan(0);
  expect(data.work[0].dates).not.toMatch(/present/i);
});
