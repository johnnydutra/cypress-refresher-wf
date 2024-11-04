/// <reference types="cypress" />

Cypress._.times(3, function () {
  it('validate privacy page independently', () => {
    cy.visit('./src/tat/privacy.html');
    cy.contains('Talking About Testing').should('be.visible');
  });
});
