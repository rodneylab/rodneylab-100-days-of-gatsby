describe('/contact accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/contact/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /We're waiting for your message…/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/contact', () => {
  it('successfully loads', () => {
    cy.visit('/contact/');
  });
});
