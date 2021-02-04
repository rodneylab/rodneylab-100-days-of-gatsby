describe('/home accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/home');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0RE — headphones sharing/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/home', () => {
  it('successfully loads', () => {
    cy.visit('/home');
  });
});
