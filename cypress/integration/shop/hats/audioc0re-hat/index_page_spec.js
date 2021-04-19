describe('/location accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/shop/hats/audioc0re-hat/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0re hat/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/shop', () => {
  it('successfully loads', () => {
    cy.visit('/shop/hats/audioc0re-hat/');
  });
});
