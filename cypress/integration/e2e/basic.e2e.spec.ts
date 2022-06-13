context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url()
      .should('eq', Cypress.env('baseUrl'))

    cy.contains('[Home Layout]')
      .should('exist')

    cy.get('#input')
      .type('Vitesse{Enter}')
      .url()
      .should('eq', Cypress.env('baseUrl') + 'hi/Vitesse')

    cy.contains('[Default Layout]')
      .should('exist')

    // cy.get('[btn]')
    // best practices use data-cy="btnHome"
    //
    cy.get('[data-cy="btnBackHome"]')
      .click()
      .url()
      .should('eq', Cypress.env('baseUrl'))
  })

  it('markdown', () => {
    cy.get('[data-cy="aboutButton"]')
      .click()
      .url()
      .should('eq', Cypress.env('baseUrl') + 'about')

    cy.get('pre.language-js')
      .should('exist')
  })
})
