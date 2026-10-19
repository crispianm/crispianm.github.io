import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";
import data from "./data.json";

it("renders the main sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: data.name })).toBeTruthy();
  for (const name of ["Publications", "Education & experience", "Skills", "Projects", "Get in touch"]) {
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

it("lists the four publications with exact venues", () => {
  expect(data.publications.map((p) => p.year)).toEqual([2026, 2025, 2025, 2023]);
  expect(data.publications.some((p) => /pp\. 1045-1049/.test(p.venue))).toBe(true);
  expect(data.publications.some((p) => /pp\. 315-325/.test(p.venue))).toBe(true);
});
