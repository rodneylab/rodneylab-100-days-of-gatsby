describe('/shop/t-shirts/ accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/shop/t-shirts/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0re Shop: T-shirts/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/shop/t-shirts/', () => {
  it('successfully loads', () => {
    cy.visit('/shop/t-shirts/');
  });
});
