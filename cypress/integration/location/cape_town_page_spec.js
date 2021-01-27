describe('/location/cape-town accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/location/cape-town');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /AudioC0RE - headphones sharing/i }).should('be.visible');
    cy.checkAccessibility();
  });
});

describe('/location/cape-town', () => {
  it('successfully loads', () => {
    cy.visit('/location/cape-town');
  });
});
