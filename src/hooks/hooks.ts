import { BeforeAll, AfterAll, Before, After, Status, AfterStep } from "@cucumber/cucumber";
import { fixture } from "./pageFixture";
import { chromium,Page,Browser, expect, BrowserContext } from "@playwright/test";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";

const fs = require("fs-extra");

let browser:Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
    
})
Before(async function ({pickle}) {
    const scenarioName =pickle.name + pickle.id;
    context =await browser.newContext();
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

AfterStep(async function ({pickle,result}) {
    const img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`,type:"png"});
    await this.attach(img,"image/png");

});
After(async function ({pickle,result}) {
    console.log(result?.status);

    //screenshot
    if(result?.status == Status.FAILED){
        const img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`,type:"png"});
        await this.attach(img,"image/png");
    }

    await fixture.page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})
