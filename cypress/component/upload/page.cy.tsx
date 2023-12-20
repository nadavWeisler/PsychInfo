import UploadContent from "../../../src/app/[lng]/upload/page";

describe("UploadPage Component Tests", () => {
    beforeEach(() => {
        cy.mount(<UploadContent />);
    });

    it("should submit the form with valid data", () => {
        cy.get("[data-cy=title]").type("Valid Title");
        cy.get("[data-cy=description]").type("Valid Description");
        cy.get("[data-cy=organization]").click();
        cy.contains("org dis").click();
        cy.get("[data-cy=link]").type("www.validlink.com");
        cy.get("[data-cy=language]").click();
        cy.contains("English").click();
        cy.get("[data-cy=tags]").click();
        cy.contains("test dis").click();

        cy.get("[data-cy=uploader]").type("Valid Uploader");

        cy.get("[data-cy=form]").submit();

        cy.get(".MuiSnackbarContent-message").should(
            "contain",
            "הטופס נשלח בהצלחה, והוא ממתין לאישור מנהל"
        );
    });

    it("should not submit the form with empty required fields", () => {
        cy.get("form").submit();
        cy.get(".MuiFormHelperText-root").should("have.length.above", 0);
        cy.get(".MuiSnackbar-root").should("not.exist");
    });

    it("should allow selection of tags", () => {
        cy.get("#select-multiple-chip").click();
        cy.get(".MuiMenu-list").contains("Tag Name").click();
    });

    it("should allow selection of organizations", () => {
        cy.get("[data-cy=organization]").click();
        cy.get(".MuiMenu-list").contains("Organization Name").click();
    });

    it("should not upload files in invalid types", () => {
        const fileName = "text.txt";

        cy.fixture(fileName).then((contents) => {
            cy.get("[data-cy=file]")
                .selectFile({
                    contents,
                    fileName,
                    mimeType: "text/plain",
                })
                .should("not.exist");
        });
    });
});
