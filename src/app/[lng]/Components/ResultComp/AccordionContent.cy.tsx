import React from "react";
import { faker } from "@faker-js/faker";
import { createRandomContent } from "@/tests/commands";

import AccordionContent from "./AccordionContent";

describe("test texts of accordion NOT in request mode", () => {
    it("renders", () => {
        const data = createRandomContent();
        cy.mount(<AccordionContent data={data} request={false} />);
        const indexes = ["0", "1", "2"];
        cy.get('[data-testid="description-title"]').should(
            "have.text",
            "תיאור"
        );
        cy.get('[data-testid="description"]').should(
            "have.text",
            data.description
        );
        cy.get('[data-testid="link-title"]').should("have.text", "קישור");
        cy.get('[data-testid="link"]').should("have.text", data.link);
        cy.get('[data-testid="org-title"]').should("have.text", "ארגון");
        cy.get('[data-testid="org"]').should("have.text", data.organization.display);

    });
});
