describe('Kumbh Mela Login Tests', () => {
    beforeEach(() => {
        cy.visit('https://chatbot.kumbh.up.gov.in/login');
    });

    it('TC_LI_01 - User should be able to login with valid credentials', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.wait(3000);
        cy.get('input[name="otp"]').type('1234');
        cy.get('button').contains('Register').click();
        cy.url().should('include', '/dashboard');
    });

    it('TC_LI_02 - User should not be able to login without entering mobile number', () => {
        cy.get('button').contains('Get OTP').click();
        cy.contains('Please enter correct number').should('be.visible');
    });

    it('TC_LI_03 - User should not be able to login without entering OTP', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.get('button').contains('Register').click();
        cy.url().should('not.include', '/dashboard');
    });

    it('TC_LI_04 - User should not be able to login with an invalid mobile number', () => {
        cy.get('input[type="tel"]').type('98765432');
        cy.get('button').contains('Get OTP').click();
        cy.contains('Please enter a valid 10-digit phone number').should('be.visible');
    });

    it('TC_LI_05 - User should not be able to login with wrong OTP', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.get('input[name="otp"]').type('0000');
        cy.get('button').contains('Register').click();
        cy.contains('Wrong OTP').should('be.visible');
    });

    it('TC_LI_06 - User should not be able to login with less than 4-digit OTP', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.get('input[name="otp"]').type('12');
        cy.get('button').contains('Register').click();
        cy.contains('Wrong OTP').should('be.visible');
    });

    it('TC_LI_07 - User should not be able to login with non-numeric mobile number', () => {
        cy.get('input[type="tel"]').type('abcde12345');
        cy.get('button').contains('Get OTP').click();
        cy.contains('Please enter a valid 10-digit phone number').should('be.visible');
    });

    it('TC_LI_08 - User should not be able to login with special characters or spaces', () => {
        cy.get('input[type="tel"]').type('987 654 3210');
        cy.get('button').contains('Get OTP').click();
        cy.contains('Please enter a valid 10-digit phone number').should('be.visible');
    });

    it('TC_CG_01 - Verify "Continue as Guest" button is visible and clickable', () => {
        cy.get('button').contains('Continue without OTP').should('be.visible').click();
    });

    it('TC_CG_02 - Verify navigation upon clicking "Continue as Guest"', () => {
        cy.get('button').contains('Continue without OTP').click();
        cy.url().should('include', '/dashboard');
    });

    it('TC_LI_09 - User should be able to login with valid country code', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.url().should('include', '/otp');
    });

    it('TC_LI_10 - User should not be able to login with non-numeric OTP', () => {
        cy.get('input[type="tel"]').type('9876543210');
        cy.get('button').contains('Get OTP').click();
        cy.get('input[name="otp"]').type('abcd');
        cy.get('button').contains('Register').click();
        cy.contains('Wrong OTP').should('be.visible');
    });
});
