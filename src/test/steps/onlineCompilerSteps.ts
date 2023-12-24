import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import OnlineCompilerPage from "../../pages/onlineCompilerPage";
import * as fs from 'fs';


setDefaultTimeout(60 * 1000 * 2);

let onlineCompilerPage:OnlineCompilerPage;
let assert: Assert;

Then('User Verify display of code editor', async function () {
    onlineCompilerPage = new OnlineCompilerPage(fixture.page);
    assert = new Assert(fixture.page);
    await onlineCompilerPage.verifyCodeEditorDisplay();

  });

Then('User enter the code in code container as {string}', async function (datafilename:string) {
    const codestr = fs.readFileSync('src/helper/util/test-data/'+datafilename, 'utf-8');
    await onlineCompilerPage.enterCodeInContainer(codestr);
  });

  Then('User click on Execute button', async function (){
    await onlineCompilerPage.clickExecuteButton();

  });

  Then('User verify the output displayed as {string}', async function (result:string) {
      await onlineCompilerPage.verifyOutput(result);
  });

  Then('User get the existing code in editor', async function () {
  
    await onlineCompilerPage.getSampleCode();
  });

  Then('User verify the editor has some code', async function () {
    await onlineCompilerPage.verifyEditorisNotEmpty();
  });


  Then('User click on New Project', async function () {
    await onlineCompilerPage.clickNewProject();
  });


  Then('User verify the display of popup with heading as {string}', async function (title:string) {
      await onlineCompilerPage.verifyNewProjectPopupTitle(title);
  });

  Then('User verify display of text as {string}', async function (msg:string) {
    await onlineCompilerPage.verifyNewProjectPopupMsg(msg);
  });

  Then('User click on Yes button', async function () {
    await onlineCompilerPage.clickNewProjectPopupYesButton();
  });

  Then('User verify editor is cleared out', async function () {
    await onlineCompilerPage.verifyEditorisEmpty();
});