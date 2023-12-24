import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import * as data from "../../helper/util/test-data/login.json";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import LoginPage from "../../pages/loginPage";

setDefaultTimeout(60 * 1000 * 2);


let loginPage: LoginPage;
let assert: Assert;

Given('User navigates to the application', async function () {
      loginPage = new LoginPage(fixture.page);
      assert = new Assert(fixture.page);
      await loginPage.navigateToLoginPage();

  });


Given('User click on the main login button', async function () {
    await loginPage.clickLoginButtonHomePage();
    fixture.logger.info("User clicked onthe Login button in home page");
  });


  Given('User enter the Email Address', async function () {
    await loginPage.enterUserName(data.email);
    fixture.logger.info("Entered username as "+data.email);
  });

  Given('User enter the password', async function () {
    await loginPage.enterPassword(data.password);
    fixture.logger.info("Entered password ");
  });

  When('User click on the login button', async function () {
    await loginPage.clickLoginButton();
    fixture.logger.info("Clicked on the login button");
  });

  Then('Login should be successful', async function () {
    await loginPage.verifyLoginStatus();
    fixture.logger.info("Loggedin Successfully")
  });

  Then('User loggedin to the application', async function () {
    await loginPage.loginUser(data.email,data.password);
  });

