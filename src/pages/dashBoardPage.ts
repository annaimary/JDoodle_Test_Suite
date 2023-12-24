import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { FileTransportOptions } from "winston/lib/winston/transports";

setDefaultTimeout(60*2*1000);

export default class DashBoardPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        dashBoard:"//header//span[text()='Dashboard']",
        menuMyProject: "//span[text()='My Projects']",
        menuAPIs: "//span[text()='APIs']",
        menuPlugins: "//span[text()='Plugins']",
        menuVirutualInsti: "//span[text()='Virtual Institutions']",
        menuPayDetails: "//span[text()='Payment Details']",
        menuDocs: "//span[text()='Documents']",
        menuContactSupport: "//span[text()='Contact Support']",
        menuSettings: "//span[text()='Settings']",
        menuLogout: "//span[text()='Logout']",
        startCoding:"//span[text()='Start Coding']"
    }

    async clickDashBoardButton() {
        await this.page.click(this.Elements.dashBoard);
    }

    async verifyDisplayOfMenuItems(){
        await expect(this.page.locator(this.Elements.menuMyProject)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuAPIs)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuPlugins)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuVirutualInsti)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuPayDetails)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuDocs)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuContactSupport)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuSettings)).toBeVisible();
        await expect(this.page.locator(this.Elements.menuLogout)).toBeVisible();
    }
    async clickStartCodingButton() {
        await this.page.click(this.Elements.startCoding);
    }

}