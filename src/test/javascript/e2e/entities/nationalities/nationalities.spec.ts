/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NationalitiesComponentsPage, NationalitiesDeleteDialog, NationalitiesUpdatePage } from './nationalities.page-object';

const expect = chai.expect;

describe('Nationalities e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nationalitiesUpdatePage: NationalitiesUpdatePage;
  let nationalitiesComponentsPage: NationalitiesComponentsPage;
  let nationalitiesDeleteDialog: NationalitiesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Nationalities', async () => {
    await navBarPage.goToEntity('nationalities');
    nationalitiesComponentsPage = new NationalitiesComponentsPage();
    await browser.wait(ec.visibilityOf(nationalitiesComponentsPage.title), 5000);
    expect(await nationalitiesComponentsPage.getTitle()).to.eq('Nationalities');
  });

  it('should load create Nationalities page', async () => {
    await nationalitiesComponentsPage.clickOnCreateButton();
    nationalitiesUpdatePage = new NationalitiesUpdatePage();
    expect(await nationalitiesUpdatePage.getPageTitle()).to.eq('Create or edit a Nationalities');
    await nationalitiesUpdatePage.cancel();
  });

  it('should create and save Nationalities', async () => {
    const nbButtonsBeforeCreate = await nationalitiesComponentsPage.countDeleteButtons();

    await nationalitiesComponentsPage.clickOnCreateButton();
    await promise.all([nationalitiesUpdatePage.setNationalityNameInput('nationalityName')]);
    expect(await nationalitiesUpdatePage.getNationalityNameInput()).to.eq(
      'nationalityName',
      'Expected NationalityName value to be equals to nationalityName'
    );
    await nationalitiesUpdatePage.save();
    expect(await nationalitiesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await nationalitiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Nationalities', async () => {
    const nbButtonsBeforeDelete = await nationalitiesComponentsPage.countDeleteButtons();
    await nationalitiesComponentsPage.clickOnLastDeleteButton();

    nationalitiesDeleteDialog = new NationalitiesDeleteDialog();
    expect(await nationalitiesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Nationalities?');
    await nationalitiesDeleteDialog.clickOnConfirmButton();

    expect(await nationalitiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
