describe('/about accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/contact/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /Get in touch/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/about', () => {
  it('successfully loads', () => {
    cy.visit('/contact/');
  });
});
