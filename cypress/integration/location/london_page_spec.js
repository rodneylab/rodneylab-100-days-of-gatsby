describe('/location/london accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/location/london');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0RE in London/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/location/london', () => {
  it('successfully loads', () => {
    cy.visit('/location/london');
  });
});
