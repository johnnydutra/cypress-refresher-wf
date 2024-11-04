Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Johnny');
  cy.get('#lastName').type('Dutra');
  cy.get('#email').type('johnny@test.com');
  cy.get('#open-text-area').type('Cypress refresher course');
  cy.get('button[type="submit"]').click();
});
