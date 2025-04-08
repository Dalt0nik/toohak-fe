import { render, screen, cleanup } from "@testing-library/react";
import { vi, expect, test, describe, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom"; // Navbar uses links and needs this to work
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { userEvent } from "@testing-library/user-event";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
//import { PublicAppRoutes } from "@models/PublicRoutes";

afterEach(() => {
  cleanup();
}); // Might not be necessary

vi.mock("@auth0/auth0-react");

describe("Navbar tests", () => {
  describe("NavItem tests", () => {
    test("Set userNavItems on login", () => {
      useAuth0.mockReturnValue({ isAuthenticated: true }); // Auth bypass

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );

      // Check for logout button
      expect(
        screen.queryByRole("button", { name: "navbar_logout" }),
        "Logout button was not found after login",
      ).not.toBeNull();
      // Check for create button
      expect(
        screen.queryByRole("link", { name: "navbar_create" }), // Routes are treated as links
        "Create button was not found after login",
      ).not.toBeNull();
      // Check for my quizzes button
      expect(
        screen.queryByRole("link", { name: "navbar_myquizzes" }),
        "My Quizzes button was not found after login",
      ).not.toBeNull();
    });

    test("Set guestNavItems on logout", () => {
      useAuth0.mockReturnValue({ isAuthenticated: false });

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );
      // Check for login button
      expect(
        screen.queryByRole("button", { name: "navbar_login" }),
        "Login button was not found after logout",
      ).not.toBeNull();
    });
  });

  // Login and logout buttons should have their own tests, but My Quizzes and Create are inbuilt inside of navbar so we test them here

  describe("Button press tests", () => {
    test("Press My Quizzes", async () => {
      useAuth0.mockReturnValue({ isAuthenticated: true });
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );

      await user.click(screen.getByRole("link", { name: "navbar_myquizzes" }));
      // Check if path matches
      expect(
        window.location.pathname,
        "My Quizzes went to the wrong path",
      ).toBe(PrivateAppRoutes.USER_QUIZZES);
    });
    test("Press Create", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );
      await user.click(screen.getByRole("link", { name: "navbar_create" }));
      // Check if path matches
      expect(window.location.pathname, "Create went to the wrong path").toBe(
        PrivateAppRoutes.CREATE_QUIZ,
      );
    });
  });
});
