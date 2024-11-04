/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('./src/tat/index.html');
});

describe('TAT Customer Support Central', () => {
  it('assert application title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('fill mandatory fields and send form', () => {
    const longText = 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongText';

    cy.clock();

    cy.get('#firstName').type('Johnny');
    cy.get('#lastName').type('Tester');
    cy.get('#email').type('johnny@test.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('be.visible');

    cy.tick(3000);

    cy.get('.success').should('not.be.visible');
  });

  it('print error message when submitting form with invalid email address', () => {
    cy.clock();

    cy.get('#firstName').type('Johnny');
    cy.get('#lastName').type('Tester');
    cy.get('#email').type('johnnytest.com');
    cy.get('#open-text-area').type('Cypress refresher course');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
  });

  it('non-numeric characters not inputed into phone field', () => {
    cy.get('#phone').type('abcdef').should('have.value', '');
  });

  it('print error message when phone field becomes mandatory but is not filled', () => {
    cy.clock();

    cy.get('#firstName').type('Johnny');
    cy.get('#lastName').type('Dutra');
    cy.get('#email').type('johnny@test.com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Cypress refresher course');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
  });

  it('fill and clear input fields', () => {
    cy.get('#firstName')
      .type('Johnny')
      .should('have.value', 'Johnny')
      .clear()
      .should('have.value', '');
    cy.get('#lastName')
      .type('Dutra')
      .should('have.value', 'Dutra')
      .clear()
      .should('have.value', '');
    cy.get('#email')
      .type('johnny@test.com')
      .should('have.value', 'johnny@test.com')
      .clear()
      .should('have.value', '');
    cy.get('#phone')
      .type('11987654321')
      .should('have.value', '11987654321')
      .clear()
      .should('have.value', '');
  });

  it('print error message when submiting form with unfilled mandatory fields', () => {
    cy.clock();

    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
  });

  it('send form successfully using custom command', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  });

  it('select a product (YouTube)', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('select a product (Mentoria) by its value', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('select a product (Blog) by its index', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('check support type (Feedback)', () => {
    cy.get('input[type="radio"][value="feedback"]').check();
  });

  it('check each support type', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each((radio) => {
        cy.wrap(radio).check();
        cy.wrap(radio).should('be.checked');
      });
  });

  it('check all checkboxes, then uncheck the last one', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('select a fixture file', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('select a file simulating drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('select a file as an aliased fixture', () => {
    const fileName = 'example.json';
    cy.fixture(fileName).as('sampleFile');
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName);
      });
  });

  it('check privacy page opens in a new tab without clicking', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  });

  it('remove target attr from link and access privacy page', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();
    cy.contains('Talking About Testing').should('be.visible');
  });

  it('show and hide alert messages with .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  });

  it('fill textarea with .invoke()', () => {
    const longText = Cypress._.repeat('0123456789', 20);
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText);
  });

  it('make http request', () => {
    cy.request(
      'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    ).should(function (response) {
      const { status, statusText, body } = response;
      expect(status).to.equal(200);
      expect(statusText).to.equal('OK');
      expect(body).to.contain('CAC TAT');
    });
  });

  it('find the hidden cat', () => {
    cy.get('#cat').invoke('show').should('be.visible');
    cy.get('#title').invoke('text', 'CAT TAT');
  });
});