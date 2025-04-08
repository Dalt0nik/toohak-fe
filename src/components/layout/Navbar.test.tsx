import { render, screen } from "@testing-library/react";
import { vi, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom"; // Navbar uses links, doesn't work without
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

// Would be nice to import the userNavItems, but feels bad to do just for the tests

test("Set userNavItems on login", () => {
  useAuth0.mockReturnValue({ isAuthenticated: true });

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

  const links = screen.queryAllByRole("link");

  const buttons: string[] = [];

  links.forEach((link) => buttons.push(link.textContent));

  expect(
    screen.getByRole("button").textContent,
    "Logout button was not found after login",
  ).toBe("navbar_logout");
  expect(
    buttons.find((button) => button === "navbar_create"),
    "Create button was not found after login",
  ).toBeDefined();
  expect(
    buttons.find((button) => button === "navbar_myquizzes"),
    "My Quizzes button was not found after login",
  ).toBeDefined();
});

test("Set guestNavItems on logout", () => {
  useAuth0.mockReturnValue({ isAuthenticated: false });

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

  expect(
    screen.getByRole("button").textContent,
    "Login button was not found after logout",
  ).toBe("navbar_login");
});
