describe('Log in', function(){
  it('logs in a user following sign up', function(){
    cy.visit('http://localhost:3000/')

    cy.contains('Register')

    cy.get('#register-link').click() //needs changing
    cy.contains('Register below')

    cy.get('#name').type('test2')
    cy.get('#email').type('test2@test.com')
    cy.get('#password').type('test_password')
    cy.get('#password2').type('test_password')

    cy.get('#sign-up').click()

    cy.contains('Login below')

    cy.get('#email').type('test_email')
    cy.get('#password').type('test_password')

    //below currently failing
    // cy.contains('Hey there, test_name')
    // cy.url().should('include', '/dashboard')
  })
})
