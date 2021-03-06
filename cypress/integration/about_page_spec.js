describe('/about accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/about');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /About/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/about', () => {
  it('successfully loads', () => {
    cy.visit('/about');
  });
});
