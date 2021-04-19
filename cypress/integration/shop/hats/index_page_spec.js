describe('/shop/hats/ accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/shop/hats/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0re Shop: Hats/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/shop/hats/', () => {
  it('successfully loads', () => {
    cy.visit('/shop/hats/');
  });
});
