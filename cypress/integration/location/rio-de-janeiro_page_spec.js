describe('/location/rio-de-janeiro accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/location/rio-de-janeiro');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0RE - headphones sharing/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/location', () => {
  it('successfully loads', () => {
    cy.visit('/location/rio-de-janeiro');
  });
});
