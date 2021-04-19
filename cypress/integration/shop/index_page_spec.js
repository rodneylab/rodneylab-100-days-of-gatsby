describe('/location accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/shop');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0re Shop/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/shop', () => {
  it('successfully loads', () => {
    cy.visit('/shop');
  });
});
