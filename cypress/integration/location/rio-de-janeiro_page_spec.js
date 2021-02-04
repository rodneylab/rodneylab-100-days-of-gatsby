describe('/location/rio-de-janeiro accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/location/rio-de-janeiro');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0RE in Rio de Janeiro/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/location', () => {
  it('successfully loads', () => {
    cy.visit('/location/rio-de-janeiro');
  });
});
