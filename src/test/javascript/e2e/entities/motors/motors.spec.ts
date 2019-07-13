/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MotorsComponentsPage, MotorsDeleteDialog, MotorsUpdatePage } from './motors.page-object';

const expect = chai.expect;

describe('Motors e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let motorsUpdatePage: MotorsUpdatePage;
  let motorsComponentsPage: MotorsComponentsPage;
  let motorsDeleteDialog: MotorsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Motors', async () => {
    await navBarPage.goToEntity('motors');
    motorsComponentsPage = new MotorsComponentsPage();
    await browser.wait(ec.visibilityOf(motorsComponentsPage.title), 5000);
    expect(await motorsComponentsPage.getTitle()).to.eq('Motors');
  });

  it('should load create Motors page', async () => {
    await motorsComponentsPage.clickOnCreateButton();
    motorsUpdatePage = new MotorsUpdatePage();
    expect(await motorsUpdatePage.getPageTitle()).to.eq('Create or edit a Motors');
    await motorsUpdatePage.cancel();
  });

  it('should create and save Motors', async () => {
    const nbButtonsBeforeCreate = await motorsComponentsPage.countDeleteButtons();

    await motorsComponentsPage.clickOnCreateButton();
    await promise.all([motorsUpdatePage.setMotorNameInput('motorName')]);
    expect(await motorsUpdatePage.getMotorNameInput()).to.eq('motorName', 'Expected MotorName value to be equals to motorName');
    await motorsUpdatePage.save();
    expect(await motorsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await motorsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Motors', async () => {
    const nbButtonsBeforeDelete = await motorsComponentsPage.countDeleteButtons();
    await motorsComponentsPage.clickOnLastDeleteButton();

    motorsDeleteDialog = new MotorsDeleteDialog();
    expect(await motorsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Motors?');
    await motorsDeleteDialog.clickOnConfirmButton();

    expect(await motorsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
