export function detectLanguage(text) {
    const hindiRegex = /[\u0900-\u097F]/;
    const englishRegex = /[A-Za-z]/;
    const odiaRegex = /[\u0B00-\u0B7F]/;
  
    if (hindiRegex.test(text)) {
      return 'hi';
    } else if (odiaRegex.test(text)) {
      return 'or';
    } else if (englishRegex.test(text)) {
      return 'en';
    } else {
      return 'Unknown Language';
    }
  }

  export function waitForField(filed, timeout = 120000, interval = 1000){
    const start = new Date().getTime();
    const checkfiled = () => {
      cy.get('body').then($body => {
        if ($body.find(filed).length > 0) {
          cy.get(filed).should('be.visible');

        } else {
          const now = new Date().getTime();
          if (now - start >= timeout) {
            throw new Error('pageTitle not found within the timeout period');
          } else {
            cy.wait(interval).then(checkfiled);
          }
        }
      });
    };
    checkfiled();
  };