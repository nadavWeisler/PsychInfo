import ErrorStep from "@/app/[lng]/Components/Wizard/steps/ErrorStep";

describe("Test ErrorStep", () => {
  beforeEach(() => {
    cy.mount(<ErrorStep errorMsg="error" />);
  });
  it("check if first typ have the correct text", () => {
    cy.get('[data-testid="typ1"]').should("contain", "אירעה שגיאה");
  });
  it("check if second typ have the correct text", () => {
    cy.get('[data-testid="typ2"]').should("contain", "error");
  });
});
