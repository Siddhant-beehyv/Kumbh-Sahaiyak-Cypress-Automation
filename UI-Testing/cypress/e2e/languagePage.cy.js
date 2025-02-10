import * as constants from '../utilities/constants.js';
import * as locators from '../utilities/locators.js';
import * as functions from '../utilities/functions.js';


describe("Kumbh App : Language Page Test Cases", () => {
  before(() => {
    cy.clearAllSessionStorage()
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  beforeEach("visit app url", () => {
    cy.viewport(constants.phone);
    cy.session('LogintoKumbh', () => {
      cy.visit(constants.kumbhsahayak)
      cy.wait(3000)
      cy.url().should("contain", constants.kumbhsahayak);

    })
    cy.visit(constants.kumbhsahayakLang)
  });

  it("TC_LS_01_LanguagePage_VaidateLanguageList", () => {
    cy.get(locators.languages).should('have.length', constants.languageList.length)
  })

  it("TC_LS_02_LanguagePage_ChooseALanguge_AndValidate", () => {
    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languagePageSubheading).invoke('text').then((heading) => {
      constants.languageList.forEach((lang) => {
        if (selectedLanguage === lang.name) {
          expect(lang.regex.test(heading)).to.eq(true)
        }
      })
    })
  })

  it("TC_LS_03_LanguagePage_ValidatelanguageAsSingleSelectOption", () => {

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length)

    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length - 1)
    cy.wait(200)
    let secondLanguage;
    do {
      // Keep picking until a different language is selected
      secondLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    } while (secondLanguage === selectedLanguage);

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length - 1)

  })

  it("TC_LS_04_LanguagePage_ValidateSelectedLanguageHighlighted", () => {

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length)
    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languageSelected).should('exist').should('be.visible').should('have.length', 1)
    cy.get(locators.languageSelected).contains(selectedLanguage)

  })

  it.skip("TC_LS_05_LanguagePage_SelectDeselectLanguage_NA", () => {
  })

  it("TC_LS_06_LanguagePage_VaidateLanguageList", () => {

    cy.get(locators.languages).should('have.length', constants.languageList.length)
    constants.languageList.forEach((lang) => {
      cy.get(locators.languages).should('contain', lang.name)
    })
  })

  it("TC_LS_07_LanguagePage_ChangeLanguage_AfterReterningFromLoginPage", () => {
    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languageSelectButton).click()
    functions.waitForField(locators.mobileNumberInput)
    cy.get(locators.mobileNumberInput).should('be.visible')
    cy.go('back');
    cy.url().should("contain", constants.kumbhsahayakLang);
    cy.get(locators.languageSelected).should('exist').should('be.visible').should('have.length', 1)

    let secondLanguage;
    do {
      // Keep picking until a different language is selected
      secondLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    } while (secondLanguage === selectedLanguage);

    cy.get(locators.languages).contains(secondLanguage).click()
    cy.get(locators.languagePageSubheading).invoke('text').then((heading) => {
      constants.languageList.forEach((lang) => {
        if (secondLanguage === lang.name) {
          expect(lang.regex.test(heading)).to.eq(true)
        }
      })
    })
    cy.get(locators.languageSelected).should('have.length', 1)

  })

  it("TC_LS_08_LanguagePage_SubmitButtonDisabled_Bydefault", () => {

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length)
    cy.get(locators.languageSelectButton).should('not.be.visible')

  })

  it("TC_LS_09_LanguagePage_SubmitButtonEnabled_AfterLanguageSelect", () => {

    cy.get(locators.languageUnselected).should('have.length', constants.languageList.length)
    cy.get(locators.languageSelectButton).should('not.be.visible')

    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languageSelectButton).should('be.visible')


  })

  it("TC_LS_10_LanguagePage_NextPageUrl_AfterLanguageSelect", () => {
    const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
    cy.get(locators.languages).contains(selectedLanguage).click()

    cy.get(locators.languagePageSubheading).invoke('text').then((heading) => {
      constants.languageList.forEach((lang) => {
        if (selectedLanguage === lang.name) {
          expect(lang.regex.test(heading)).to.eq(true)
        }
      })
    })

    cy.get(locators.languageSelectButton).click()
    functions.waitForField(locators.mobileNumberInput)
    cy.get(locators.mobileNumberInput).should('be.visible')
    cy.url().should("contain", constants.kumbhsahayakLogin);

  })

  it.skip("TC_LS_11_LanguagePage_ButtonAlignments_VISIBLE_TESTING", () => {
  })

  constants.androidDevices.forEach(device => {
    it(`TC_LS_12_Responsiveness_Testing : Android Device ${device.name}`, () => {
      cy.viewport(device.width, device.height);

      const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
      cy.get(locators.languages).contains(selectedLanguage).click()

      cy.get(locators.languageSelectButton).click()
      functions.waitForField(locators.mobileNumberInput)
      cy.get(locators.mobileNumberInput).should('be.visible')
      cy.url().should("contain", constants.kumbhsahayakLogin);
    });
  });

  constants.iosDevices.forEach(device => {
    it(`TC_LS_12_Responsiveness_Testing : IOS device ${device.name}`, () => {
      cy.viewport(device.width, device.height);

      const selectedLanguage = constants.languageList[Math.floor(Math.random() * constants.languageList.length)].name;
      cy.get(locators.languages).contains(selectedLanguage).click()

      cy.get(locators.languageSelectButton).click()
      functions.waitForField(locators.mobileNumberInput)
      cy.get(locators.mobileNumberInput).should('be.visible')
      cy.url().should("contain", constants.kumbhsahayakLogin);
    });
  });
})