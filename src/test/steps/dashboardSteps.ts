import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import * as data from "../../helper/util/test-data/login.json";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import DashBoardPage from "../../pages/dashBoardPage";

setDefaultTimeout(60 * 1000 * 2);

let dashBoardPage:DashBoardPage;
let assert: Assert;

Given('User click on Dashboard button', async function () {
      dashBoardPage = new DashBoardPage(fixture.page);
      assert = new Assert(fixture.page);
      await dashBoardPage.clickDashBoardButton();

  });

Then('User verify display of all DashBoard menu items', async function () {
    await dashBoardPage.verifyDisplayOfMenuItems();
  });

Then('User click on Start Coding button', async function () {
     await dashBoardPage.clickStartCodingButton();

});

