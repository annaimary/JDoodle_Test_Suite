import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import * as data from "../helper/util/test-data/output.json";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60*2*1000);

export default class OnlineCompilerPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        codeContainer:"//div[@id='code']//div[@class='ace_content']",
        buttonExecute:"//button[contains(text(),'Execute')]",
        splitTabInput:"//div[@id='splitTabsHeader']//button[contains(text(),'Input')]",
        splitTabOutput:"//div[@id='splitTabsHeader']//button[contains(text(),'Output')]",
        newProject : "(//div//button[contains(@class,'btn link-primary')]/*[local-name()='svg']/*[local-name()='path'])[1]",
        newProjectPopupTitle:"//h1[text()='New Project']",
        newProjectPopupMsg: "//p[text()='Do you want to clear current project?']",
        newProjectPopupYesButton: "//button[contains(text(),'Yes')]"
    }   

    async verifyCodeEditorDisplay(){        
        await expect(this.page.locator(this.Elements.codeContainer)).toBeVisible();
    }
    async enterCodeInContainer(codeAsText:string) {
        await this.page.locator(this.Elements.codeContainer).click();
        await this.page.locator(this.Elements.codeContainer).scrollIntoViewIfNeeded({timeout:2000});
        await this.page.locator(this.Elements.codeContainer).press("Control+a");
        await this.page.locator(this.Elements.codeContainer).press("Backspace");
        await this.page.locator(this.Elements.codeContainer).pressSequentially(codeAsText);
        fixture.logger.info(codeAsText);
    }

    async getSampleCode(){
        await this.page.locator(this.Elements.codeContainer).scrollIntoViewIfNeeded();
        const sampleCode = await this.page.locator(this.Elements.codeContainer).textContent();
        fixture.logger.info("Sample code in editor is "+sampleCode);
    }

    async verifyEditorisNotEmpty(){
        let code = await this.page.locator(this.Elements.codeContainer).textContent();
        if(code.length!=0){
            fixture.logger.info("Editor has sample code "+code);
        }else{
            fixture.logger.error("Editor is empty")
        }
    }
    async verifyEditorisEmpty(){
        let code = await this.page.locator(this.Elements.codeContainer).textContent();
        if(code.length==0){
            fixture.logger.info("Editor is empty");
        }else{
            fixture.logger.error("Editor is not empty") ; 
        }
    }
    async clickExecuteButton() {
        await this.page.click(this.Elements.buttonExecute);
    }

    async clickNewProject() {
        await this.page.click(this.Elements.newProject);
    }

    async verifyNewProjectPopupTitle(expTitle:string) {
        let title = await this.page.locator(this.Elements.newProjectPopupTitle).textContent();
        await expect(title).toEqual(expTitle);
        }

    async verifyNewProjectPopupMsg(expmsg:string) {
        let msg = await this.page.locator(this.Elements.newProjectPopupMsg).textContent();
        await expect(msg).toEqual(expmsg);
        }
    async clickNewProjectPopupYesButton() {
        await this.page.click(this.Elements.newProjectPopupYesButton);
 
        }
   
    async verifyOutput(result:string) {
        await this.page.click(this.Elements.splitTabOutput);
        await expect(this.page.getByText(result)).toBeVisible({timeout:10000});
    }
}
