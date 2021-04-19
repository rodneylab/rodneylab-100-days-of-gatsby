describe('/shop/t-shirts/audioc0re-t-shirt/ accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/shop/t-shirts/audioc0re-t-shirt/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0re t-shirt/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/shop/t-shirts/audioc0re-t-shirt/', () => {
  it('successfully loads', () => {
    cy.visit('/shop/t-shirts/audioc0re-t-shirt/');
  });
});
