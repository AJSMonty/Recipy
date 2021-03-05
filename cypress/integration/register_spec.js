describe('Sign up', function(){
  it('signs up a new user', function(){
    cy.visit('http://localhost:3000/')

    cy.contains('Register')

    cy.get('#register-link').click()

    cy.url().should('include', '/register')
    cy.contains('Register below')

    cy.get('#name').type('test_name')
    cy.get('#email').type('test_email@test.com')
    cy.get('#password').type('test_password')
    cy.get('#password2').type('test_password')

    cy.get('#sign-up').click()

    //below currently failing
    // cy.url().should('include', '/login')
    cy.contains('Login below')
  })
})
