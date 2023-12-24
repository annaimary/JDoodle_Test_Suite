import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60*2*1000);

export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        loginButtonHomePage: "//header//div[contains(text(),'Login')]",
        userInput: "//div[contains(@id,'login')]//input[@type='email']",
        passwordInput: "//div[contains(@id,'login')]//input[@type='password']",
        loginBtn: "//div[contains(@id,'login')]//button[@type='submit']",
        dashBoard:"//header//span[text()='Dashboard']",
        errMessage: "//p[(@class='p-xsmall error') and (contains(text(),'Sorry, we were not able to find a user with that username and password.'))]"
    }

    async navigateToLoginPage() {
        await this.page.goto(process.env.BASEURL);
    }
    async enterUserName(user: string) {
        await this.page.fill(this.Elements.userInput, user);
    }
    async enterPassword(Password: string) {
        await this.page.fill(this.Elements.passwordInput, Password); 
    }

    async clickLoginButtonHomePage() {
        await this.page.click(this.Elements.loginButtonHomePage);
    }
    async clickLoginButton() {
        await this.page.click(this.Elements.loginBtn);
    }

    async verifyLoginStatus(){
        
        await expect(this.page.locator(this.Elements.dashBoard)).toBeVisible({timeout:20000});
    }
    async loginUser(user: string, password: string) {
        await this.clickLoginButtonHomePage();
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.page.waitForTimeout(5000);
        await this.verifyLoginStatus();
    }


}